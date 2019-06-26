class FullContactJob < ApplicationJob
  queue_as :full_contact

  def perform(type, opts = {})
    user_throttle = Sidekiq::Limiter.window("full_contact", 60, :second, wait_timeout: 15)

    user_throttle.within_limit do
      case type
      when "people"
        webhook_url = case Rails.env
        when "development"
          "https://09b95536.ngrok.io"
        else "staging"
          ENV['host_url']
        end
        debugger

        response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
        { "email" => "#{opts.email}",
          "webhookUrl" => "#{webhook_url}/api/webhooks/full_contact_people"
        }.to_json,
        {:authorization => "Bearer #{Rails.application.credentials.full_contact[:api_key]}"})

        #if repsonse isn't 200, raise exception => status, body of request
      when "company"
      else
        logger.debug "No supported type provided"
      end
    end
  end
end