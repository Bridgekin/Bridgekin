class SendTwilioJob < ApplicationJob
  queue_as :default

  def perform(to, message)
    client = Twilio::REST::Client.new(
      Rails.application.credentials.twilio[:account_sid],
      Rails.application.credentials.twilio[:auth_token]
    )

    begin
      client.messages.create(
        from: Rails.application.credentials.twilio[:phone_number],
        to: "+1" + to,
        body: message
      )
    rescue
      logger.error "Text message didn't send - Twilio client error or crash occured to phone number: " + to.to_s
    end
  end
end
