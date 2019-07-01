require 'clearbit'
# require 'nameable'
class ConnectSocialJob < ApplicationJob
  queue_as :default

  def perform(import_hash, current_user)
    aws_env = case Rails.env
    when "production"
      :aws_prod
    when "staging"
      :aws_staging
    else
      :aws_dev
    end
    
    s3 = Aws::S3::Client.new(
      region: Rails.application.credentials[aws_env][:region], #or any other region
      access_key_id: Rails.application.credentials[aws_env][:access_key_id],
      secret_access_key: Rails.application.credentials[aws_env][:secret_access_key]
    )
    # debugger
    import_hash.each do |key, upload|
      case key
      when "linked_in_key"
        resp = s3.get_object(bucket:Rails.application.credentials[aws_env][:bucket], key: upload)
        parsedFile = CSV.parse(resp.body.read.split("\n")
          .drop(4)
          .tap(&:pop)
          .join("\n")
          .remove("\r"),
          headers: true)
        ingestLinkedIn(parsedFile, current_user)
      when "google_users_array"
        ingestGoogle(upload, current_user)
      else
        logger.debug "Unsupported key provided"
      end
    end
    #When complete, send an email letting user know that the import is finished
    SalesMailer.notify_contacts_imported(current_user)
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
    google_contacts.take(5).each do |entry|
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
          FullContactJob.perform_later("people", email: contact.email)
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
      contact = SalesContact.find_by(
        email: entry["Email Address"],
        fname: entry["First Name"],
        lname: entry["Last Name"],
        company: entry["Company"],
        position: entry["Position"]
        ) || SalesContact.new

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