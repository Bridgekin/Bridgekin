class SendTwilioJob < ApplicationJob
  queue_as :default

  def perform(to, message)
    account_sid = Rails.env === "production" ? ENV['TWILIO_ACCOUNT_SID'] : Rails.application.credentials.twilio[Rails.env.to_sym][:account_sid]
    auth_token = Rails.env === "production" ? ENV['TWILIO_AUTH_TOKEN'] : Rails.application.credentials.twilio[Rails.env.to_sym][:auth_token]
    phone_number = Rails.env === "production" ? ENV['TWILIO_PHONE_NUMBER'] : Rails.application.credentials.twilio[Rails.env.to_sym][:phone_number]

    client = Twilio::REST::Client.new(
      account_sid, auth_token
    )

    begin
      client.messages.create(
        from: phone_number,
        to: "+1" + to,
        body: message
      )
    rescue
      logger.error "Text message didn't send - Twilio client error or crash occured to phone number: " + to.to_s
    end
  end
end
