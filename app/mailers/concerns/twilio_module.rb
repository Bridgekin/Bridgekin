module TwilioRouter
  def send(message, to)
    client = Twilio::REST::Client.new(
      Rails.application.credentials.twilio[:account_sid],
      Rails.application.credentials.twilio[:auth_token]
    )
    
    to = '+14436326422'

    begin
      client.messages.create(
        from: Rails.application.credentials.twilio[:phone_number],
        to: to,
        body: message
      )
    rescue
    end
  end
end