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

  def self.search_contacts(current_user, network, filter='', social_params ={})
    sales_contacts = network.member_contacts
      .where.not(fname: '') #, last_full_contact_lookup: nil)
      .distinct
      # .where(google: true)
      # .or(network.member_contacts
      #   .where.not(fname: '', google: true)
      #   .distinct)

    # Filter back setting
    sales_contacts = case filter
    when "teammates"
      sales_contacts.where.not(id: current_user.sales_contacts)
    when "mine"
      sales_contacts.where(id: current_user.sales_contacts)
    when "linkedIn"
      sales_contacts.where(linked_in: true)
    when "google"
      sales_contacts.where(google: true)
    else
      sales_contacts
    end

    #Parse Results from user entry
    SEARCH_MAP.each do |key, value|
      if social_params[value].present?
        sales_contacts = sales_contacts.where("LOWER(sales_contacts.#{key}) LIKE LOWER(?)", "%#{social_params[value]}%") 
      end
    end
    sales_contacts
  end

  def self.prep_search_data(sales_contacts, offset, limit, current_user)
    #Filter Results
    total = sales_contacts.count #Fine for memory
    sales_contacts = sales_contacts.offset(offset)
      .limit(limit) 
    #Get Companion information
    friends = Set.new()
    friend_map = sales_contacts.reduce({}) do |acc, contact|friends
      contact_friends = contact.friends
        .where.not(users: {id: current_user.id})
      friends.merge(contact_friends)
      acc[contact.id] = contact_friends.pluck(:id)
      acc
    end
    friend_users = friends.to_a

    return sales_contacts, total, friend_map, friend_users
  end

  def self.find_similar_or_initialize_by(type, current_user, payload)
    case type
    when "google"
      contact = SalesContact.find_by(email:payload[:email])
      unless contact 
        contact = SalesContact.find_by(fname: payload[:fname],lname: payload[:lname])
        import_domain = payload[:email].split('@').last

        company = SalesCompany.find_by(title: contact.company)
        unless company && import_domain == company.domain
          contact = nil
        end
      end
    when "linkedin"
      company = SalesCompany.build_sales_company(payload[:company])

      contact = SalesContact.find_by(fname: payload[:fname],lname: payload[:lname]) 
      if contact.present?
        #Confirm this is actually the same contact
        contact_domain = contact.email.split('@').last
        contact.email.present?
        unless (contact.company == payload[:company] && contact.position == payload[:position]) || contact_domain == company.domain
          contact = nil
        end
      end
    else
    end

    contact || SalesContact.find_or_initialize_by(payload)
  end

  def self.delete_unauth_location?(location)
    EXCLUDE_CITIES.each do |country|
      return true if location.downcase.include?(country.downcase)
    end
    false
  end

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

  def grab_avatar_image(url)
    # downloaded_image = open(url)
    tempfile = Down.download(url)
    mimetext = MIME::Types[tempfile.content_type].first
    extension = mimetext.preferred_extension

    if extension.present?
      self.avatar.attach(io: tempfile, filename: "full_contact_avatar-#{self.id}.#{extension}")
    end
  end
end
