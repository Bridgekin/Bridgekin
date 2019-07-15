class FullContactJob < ApplicationJob
  # include Sidekiq::Worker
  queue_as :default
  # sidekiq_options throttle: { threshold: 390, period: 1.minute }
  throttle threshold: 390, period: 1.minute

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
        "https://611da87c.ngrok.io"
      else "staging"
        ENV['host_url']
      end

    # user_throttle.within_limit do
      case type
      when "people"
        logger.debug "Starting Lookup"
        begin
          response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
          { 
            "email" => "#{opts[:email]}",
            "webhookUrl" => "#{webhook_url}/api/webhooks/full_contact_people?contact_id=#{opts[:contact_id]}"
          }.to_json,
          {:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})
        rescue StandardError => e
          error = JSON.parse(e.response)
          logger.error "Failed Lookup (FC) - email: #{opts[:email]}, status: #{error["status"]}, msg: #{error["message"]}"
          if error["status"] == 403
            sleep(60)
            raise
          end
        end
          
      when "company"
        response = RestClient.post("https://api.fullcontact.com/v2/company/search.json",{ "companyName" => "#{opts.company}"}.to_json,{:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})
      else
        logger.debug "No supported type provided"
      end
    # end
  end
end