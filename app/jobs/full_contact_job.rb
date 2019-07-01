class FullContactJob < ApplicationJob
  # include Sidekiq::Worker
  queue_as :default
  # sidekiq_options throttle: { threshold: 400, period: 1.minute }
  # throttle threshold: 400, period: 1.minute

  FCVARS = {
    # "email" => :email,
    "location" => :location,
    "title" => :position,
    "organization" => :company,
    "twitter" => :twitter_handle,
    "linkedin" => :linkedin_url,
    "facebook" => :facebook_url
  }

  def perform(type, opts = {})
    # user_throttle = Sidekiq::Limiter.window("full_contact", 60, :second, wait_timeout: 15)
    webhook_url = case Rails.env
      when "development"
        "https://75c26cf0.ngrok.io"
      else "staging"
        ENV['host_url']
      end

    case type
    when "people"
      begin
        # "webhookUrl" => "#{webhook_url}/api/webhooks/full_contact_people"
        debugger
        response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
        { "email" => "#{opts[:email]}"}.to_json,
        {:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})

        parsed = JSON.parse(response.body)
        
        contact = SalesContact.find_by(email: opts[:email])
        logger.debug "Contact email is #{contact.email}"
        debugger
        # unless contact.nil?
        if contact.present?
          logger.debug "Contact is present"
          #Set basic information
          FCVARS.each do |key, value|
            if parsed[key].present?
              contact[value] = params[key]
            end
          end

          #Set Avatar
          contact.grab_avatar_image(parsed["avatar"]) if parsed["avatar"]
          #Set Name // Don't change name yet
          # if person["fullName"].present?
          #   name = Nameable.parse(person["fullName"])
          #   contact.fname = name.first
          #   contact.lname = name.last
          # end
          contact.last_full_contact_lookup = Datetime.now
          contact.save
          debugger
          logger.debug "Contact is saved"
        end
      rescue
        logger.debug "No email found or Error"
      end

      #if repsonse isn't 200, raise exception => status, body of request
    when "company"
      response = RestClient.post("https://api.fullcontact.com/v2/company/search.json",{ "companyName" => "#{opts.company}"}.to_json,{:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})
    else
      logger.debug "No supported type provided"
    end
    # user_throttle.within_limit do
    # end
  end
end