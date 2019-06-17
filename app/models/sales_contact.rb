class SalesContact < ApplicationRecord
  has_many :sales_user_contacts,
    foreign_key: :contact_id,
    class_name: :SalesUserContact

  has_many :friends,
    through: :sales_user_contacts,
    source: :user

  headerMapping = {
    "Email Address": :email,
    "First Name": :fname,
    "Last Name": :lname,
    "Company": :company,
    "Position": :position
  }

  def self.ingestGoogle(emails, currentUser)

  end

  def self.ingestLinkedIn(parsedFile, currentUser)
    failed_saved_contacts = Array.new
    parsedFile.each do |entry|
      contact = SalesContact.find_by(email: entry["Email Address"]) || SalesContact.new

      parsedFile.headers.each do |header|
        unless contact[headerMapping[header]]
          contact[headerMapping[header]] = entry[header]
        end
      end

      #Set Source
      contact.setSource(:linked_in_upload)

      #Save failed contact save if needed
      unless contact.save
        failed_saved_contacts << {
          contact: entry, source: :linked_in_upload
        }
      else
        #Link Contact to Current User
        # contact.friends << currentUserNode
        SalesUserContact.create(
          user_id: currentUser.id,
          contact_id: contact.id
        )
      end
    end
    
    if failed_saved_contacts.length > 0
      logger.error "Failed to sync following contacts for user id #{@user.id.to_s}:" + failed_saved_contacts.to_s
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
end
