class HunterJob < ApplicationJob
  queue_as :default

  def perform(company, contact)
    begin
      api_key = Rails.env === "production" ? ENV['HUNTER_API_KEY'] : Rails.application.credentials.hunter[Rails.env.to_sym]

      response = RestClient.get "https://api.hunter.io/v2/email-finder?domain=#{company.domain}&first_name=#{contact.fname}&last_name=#{contact.lname}&api_key=#{api_key}"

      parsed = JSON.parse(response.body)
      email = parsed["data"]["email"]
      if email.present?
        contact.email = email
        contact.save

        FullContactJob.perform_later("people", email: contact.email, contact_id: contact.id)
      end
    rescue
      logger.error "Hunter couldn't find record with company name: #{company.title} and contact name: #{contact.fname} #{contact.lname}"
    end
  end
end