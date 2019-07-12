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

  SEARCH_MAP = {
    "fname" => :fname,
    "lname" => :lname,
    "position" => :position,
    "location" => :location,
    "company" => :company
  }

  def self.search_contacts(current_user, network, filter='', social_params ={})
    sales_contacts = network.member_contacts
      .where.not(fname: '')
      .distinct
    # Filter back setting
    sales_contacts = case filter
    when "teammates"
      sales_contacts.where.not(id: current_user.sales_contacts)
    when "teammates1"
      sales_contacts = network.member_contacts
      .where.not(fname: '')

      sales_contacts.where.not(id: current_user.sales_contacts)
    when "mine"
      current_user.sales_contacts
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
    sales_contacts = sales_contacts.distinct
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
