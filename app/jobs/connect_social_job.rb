# require 'clearbit'
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
      when "google_key"
        resp = s3.get_object(bucket:Rails.application.credentials[aws_env][:bucket], key: upload)
        parsedFile = JSON.parse(resp.body.read
          .remove("\r")
          .split("\n")[3])
        ingestGoogle(parsedFile, current_user)
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
    google_contacts.each do |entry|
      #Skip any cases without emails
      next if entry['email'].nil?
      contact = SalesContact.find_or_initialize_by(email: entry['email'])
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
          FullContactJob.perform_later("people", email: contact.email, contact_id: contact.id)
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
      contact = SalesContact.find_or_initialize_by(
        fname: entry["First Name"],
        lname: entry["Last Name"],
        company: entry["Company"],
        position: entry["Position"]
      )
      contact.email = entry["Email Address"] if entry["Email Address"].present? && contact.email.blank?
      # parsed_file.headers.each do |header|
      #   if HEADERMAPPING[header].present? && contact[HEADERMAPPING[header]].blank?
      #     contact[HEADERMAPPING[header]] = entry[header]
      #   end
      # end
      #Set Source
      contact.setSource(:linked_in_upload)
      if contact.save
        #Check if contact and user are already friends
        unless current_user.sales_contacts.include?(contact)
          current_user.sales_user_contacts.create(contact: contact)
        end
        # company = SalesCompany.find_or_initialize_by(title: contact.company)

        # begin
        #   response = RestClient.get("https://autocomplete.clearbit.com/v1/companies/suggest?query=#{company.title}")

        #   parsed = JSON.parse(response.body)
        #   answer = parsed.reduce({}) do |acc, entry|
        #     if entry["name"].downcase == company.title.downcase
        #       acc = entry
        #     end
        #     acc
        #   end

        #   if answer.present?
        #     # debugger
        #     company.domain = answer["domain"]
        #     company.logo_url = answer["logo"]
        #     company.grab_logo_image(answer["logo"]) if answer["logo"].present?
        #   end
          
        #   if company.save
        #     #Turning off for the moment
        #     # HunterJob.perform_later(company, contact) if company.domain.present?
        #   else
        #     logger.error "Failed to save company #{company.title} because of #{company.errors.full_messages.join(" ")}"
        #   end
        # rescue => e
        #   logger.error "Error getting and saving company, detailed here: #{e.errors}"
        # end
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