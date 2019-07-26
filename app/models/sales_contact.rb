class SalesContact < ApplicationRecord
  has_many :sales_user_contacts,
    foreign_key: :contact_id,
    class_name: :SalesUserContact,
    dependent: :destroy

  has_many :friends,
    through: :sales_user_contacts,
    source: :user

  has_many :sales_intros,
    foreign_key: :contact_id,
    class_name: :SalesIntro,
    dependent: :destroy

  has_one_attached :avatar

  def sales_company
    SalesCompany.find_by(title: self.company)
  end

  SEARCH_MAP = {
    "fname" => :fname,
    "lname" => :lname,
    "position" => :position,
    "location" => :location,
    "company" => :company
  }

  EXCLUDE_CITIES = ["Cuba", "Iran", "North Korea", "Sudan", "Syria", "Crimea", "Russia", "Ukraine", "France", "Spain", "Sweden", "Norway", "Germany", "Finland", "Poland", "Italy", "United Kingdom", "Romania", "Belarus", "Kazakhstan", "Greece", "Bulgaria", "Iceland", "Hungary", "Portugal", "Austria", "Czech Republic", "Serbia", "Ireland", "Lithuania", "Latvia", "Croatia", "Bosnia", "Herzegovina", "Slovakia", "Estonia", "Denmark", "Switzerland", "Netherlands", "Moldova", "Belgium", "Albania", "North Macedonia", "Turkey", "Slovenia", "Montenegro", "Kosovo", "Cyprus", "Azerbaijan", "Luxembourg", "Georgia", "Andorra", "Malta", "Liechtenstein", "San Marino", "Monaco", "Vatican City"]
  
  class << self 
    def search_contacts(current_user = nil, network = nil, filter='', social_params ={})
      return nil if current_user.nil? || network.nil? || !current_user.is_a?(User)
      #Determine relationship
      sales_contacts = determine_relationship(current_user, network)
      #Filter back setting
      sales_contacts = filter_sales_contacts(sales_contacts,current_user, filter)
      # Track & save search terms, filter sales_contacts
      sales_contacts = filter_by_search_input(sales_contacts, current_user, social_params)
    end

    def determine_relationship(current_user, network)
      member_type = network.get_member_type(current_user)
      if member_type == 'full'
        sales_contacts = network.member_contacts
      else
        sales_contacts = current_user.sales_contacts
      end
      sales_contacts
    end

    def filter_sales_contacts(sales_contacts, current_user, filter)
      case filter
      when "teammates"
        sales_contacts.where.not(sales_user_contacts: {user: current_user })
      when "mine"
        sales_contacts.where(sales_user_contacts: {user: current_user })
      when "linkedIn"
        sales_contacts.where(linked_in: true)
      when "google"
        sales_contacts.where(google: true)
      else
        sales_contacts
      end
    end

    def filter_by_search_input(sales_contacts, current_user, social_params)
      # Track search terms
      trackTerm = TrackSearchTerm.new(user_id: current_user.id)
      #Parse Results from user entry
      SEARCH_MAP.each do |key, value|
        if social_params[value].present?
          trackTerm[value] = social_params[value];
          sales_contacts = sales_contacts.where("LOWER(sales_contacts.#{key}) LIKE LOWER(?)", "%#{social_params[value]}%") 
        end
      end
      #Save search term
      trackTerm.save
      sales_contacts.where.not(fname: '')
          .distinct
    end

    def prep_search_data(sales_contacts, current_user, offset = 0, limit = 10)
      #Filter Results
      total = sales_contacts.count #Fine for memory
      sales_contacts = sales_contacts.offset(offset)
        .limit(limit) 
      #Get Companion information
      friends = Set.new()
      friend_map = sales_contacts.reduce({}) do |acc, contact|
        contact_friends = contact.friends
          .where.not(users: {id: current_user.id})
        friends.merge(contact_friends)
        acc[contact.id] = contact_friends.pluck(:id)
        acc
      end
      friend_users = friends.to_a

      return sales_contacts, total, friend_map, friend_users
    end
  
    def find_similar_or_initialize_by(type, payload)
      case type
      when "google"
        contact = SalesContact.find_by(email:payload[:email])
        unless contact
          contact = SalesContact.find_by(fname: payload[:fname],lname: payload[:lname])
          if contact.present?
            import_domain = payload[:email].split('@').last
            company = SalesCompany.find_by(title: contact.company) if contact.company.present?
            unless company && import_domain == company.domain
              contact = nil
            end
          end
        end
      when "linked_in"
        company = SalesCompany.build_sales_company(payload[:company])

        contact = SalesContact.find_by(fname: payload[:fname],lname: payload[:lname]) 
        if contact.present?
          #Confirm this is actually the same contact
          contact_domain = contact.email.split('@').last if contact.email.present?

          unless (contact.company == payload[:company] && contact.position == payload[:position]) || (company.present? && contact_domain == company.domain)
            contact = nil
          end
        end
      else
      end

      contact || SalesContact.find_or_initialize_by(payload)
    end

    #Tests Deferred
    def delete_unauth_location?(location)
      EXCLUDE_CITIES.each do |country|
        return true if location.downcase.include?(country.downcase)
      end
      false
    end
  end

  #Tests Deferred
  def normalize_location_and_delete?(location)
    geocoder_results = Geocoder.search(location)

    unless geocoder_results.empty?
      address_obj = geocoder_results.first.data["address"]
      return true if SalesContact.delete_unauth_location?(address_obj["country"])
      self.location = geocoder_results.first.address
      false
    else
      begin
        response = RestClient.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
        { params: {
          "input" => location,
          "inputtype" => "textquery",
          "key" => Rails.application.credentials.google_places[:api_key],
          "fields" => "photos,formatted_address,name,rating,opening_hours,geometry"
        }})
        parsed = JSON.parse(response.body)

        unless parsed["candidates"].empty?
          location = parsed["candidates"].first["formatted_address"]
          return true if SalesContact.delete_unauth_location?(location)
          self.location = location
        end
        false
      rescue => exception
        logger.error "places api call failed for contact: #{self.id}"
        false
      end
    end
  end

  #Tests Deferred
  def setSource(source)
    case source
    when :linked_in_upload
      self.linked_in = true
    when :google_upload
      self.google = true
    when :facebook_upload
      self.facebook = true
    else 
    end
  end

  #Tests Deferred
  def grab_avatar_image(url)
    # downloaded_image = open(url)
    begin
      tempfile = Down.download(url)
      mimetext = MIME::Types[tempfile.content_type].first
      extension = mimetext.preferred_extension
  
      if extension.present?
        self.avatar.attach(io: tempfile, filename: "full_contact_avatar-#{self.id}.#{extension}")
      end
    rescue => e
      logger.error "Error downloading avatar image for contact #{self.id}: #{e.messsage}"
    end
  end
end
