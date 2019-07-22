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
    
    stat = ConnectSocialStat.find_or_create_by(
      uploader_id: current_user.id,
      linked_in_url: import_hash["linked_in_key"],
      google_url: import_hash["google_key"]
    )

    begin
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
      stat.update(status: "finished")
    rescue => exception
      stat.update(status: "failed", retry_count: stat.retry_count + 1) 
      logger.error "Connect Social Upload failed. Stat id: #{stat.id}, user_id: #{current_user.id}"
    end
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
    google_contacts.each do |entry|
      #Skip any cases without emails
      next if entry['email'].blank? || entry['name'].blank?
      GoogleUploadJob.perform_later(entry, current_user)
    end
  end
  
  def ingestLinkedIn(parsed_file, current_user)
    parsed_file.each do |entry|
      #Skip any cases without emails
      next if entry["First Name"].blank? || entry["Company"].blank?
      LinkedInUploadJob.perform_later(entry, current_user)
    end
  end

  HEADERMAPPING = {
    "Email Address" => :email,
    "First Name" => :fname,
    "Last Name" => :lname,
    "Company" => :company,
    "Position" => :position
  }

end