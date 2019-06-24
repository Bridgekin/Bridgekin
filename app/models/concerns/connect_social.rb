require 'clearbit'
require 'nameable'
require 'fullcontact'
require 'rest-client'
require 'json'

module ConnectSocial

  def import_contacts(import_hash, current_user)
    import_hash.each do |key, upload|
      case key
      when "linked_in_upload"
        parsedFile = CSV.parse(upload.read, headers: true)
        ingestLinkedIn(parsedFile, current_user)
      when "google_users_array"
        parsed_array = JSON.parse(upload)
        ingestGoogle(parsed_array, current_user)
      else
      end
    end

    #When complete, send an email letting user know that the import is finished
    # SalesMailer.notify_contacts_imported(current_user).deliver_later
  end

  FCVARS = {
    "email" => :email,
    "twitter" => :twitter_handle,
    "location" => :location,
    "title" => :position,
    "organization" => :company,
    "linkedin" => :linkedin_url,
    "facebook" => :facebook_url
  }

  def ingestGoogle(google_contacts, current_user)    
    failed_saved_contacts = Array.new

    google_contacts.take(15).each do |entry|
      if entry['email'].nil?
        contact = SalesContact.new()
      else
        contact = SalesContact.find_by(email: entry['email']) || SalesContact.new(email: entry['email'])
      end
      #Set Contact's Name
      if entry['name'].present?
        name = Nameable.parse(entry['name'])
        contact.fname = name.first
        contact.lname = name.last
      end
      #Set Source
      contact.setSource(:google_upload)
      #Save Contact
      if contact.save
        #Check if contact and user are already friends
        unless current_user.sales_contacts.include?(contact)
          SalesUserContact.create(
            user_id: current_user.id,
            contact_id: contact.id
          )
        end
        # Kickoff Full Contact
        if contact.email.present? # && contact.last_full_contact_lookup.nil?
          webhook_url = case Rails.env
          when "development"
            "https://09b95536.ngrok.io"
          else "staging"
            ENV['host_url']
          end

          RestClient.post("https://api.fullcontact.com/v3/person.enrich",
          { "email" => "#{contact.email}",
            "webhookUrl" => "#{webhook_url}/webhooks/full_contact"
          }.to_json,
          {:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})
        end
      else
        #Save failed contact if needed
        failed_saved_contacts << {
          contact: entry, source: :linked_in_upload
        }
      end
    end

    if failed_saved_contacts.length > 0
      logger.error "Google: Failed to sync following contacts for user id #{@user.id.to_s}:" + failed_saved_contacts.to_s
    end
  end
  
  HEADERMAPPING = {
    "Email Address" => :email,
    "First Name" => :fname,
    "Last Name" => :lname,
    "Company" => :company,
    "Position" => :position
  }

  def ingestLinkedIn(parsed_file, current_user)
    failed_saved_contacts = Array.new

    parsed_file.each do |entry|
      if entry["Email Address"].nil?
        contact = SalesContact.new
      else
        contact = SalesContact.find_by(email: entry["Email Address"]) || SalesContact.new
      end

      parsed_file.headers.each do |header|
        if HEADERMAPPING[header].present? && contact[HEADERMAPPING[header]].blank?
          contact[HEADERMAPPING[header]] = entry[header]
        end
      end

      #Set Source
      contact.setSource(:linked_in_upload)
      if contact.save
        #Check if contact and user are already friends
        unless current_user.sales_contacts.include?(contact)
          SalesUserContact.create(
            user_id: current_user.id,
            contact_id: contact.id
          )
        end
      else
        #Save failed contact if needed
        failed_saved_contacts << {
          contact: entry, source: :linked_in_upload
        }
      end
    end

    if failed_saved_contacts.length > 0
      logger.error "LinkedIn: Failed to sync following contacts for user id #{@user.id.to_s}:" + failed_saved_contacts.to_s
    end
  end
end