# Download the twilio-ruby library from twilio.com/docs/libraries/ruby
require 'twilio-ruby'

client = Twilio::REST::Client.new(
  Rails.application.credentials.twilio[Rails.env.to_sym][:account_sid],
  Rails.application.credentials.twilio[Rails.env.to_sym][:auth_token]
)

from = Rails.application.credentials.twilio.phone_number # Your Twilio number
to = '+14436326422' # Your mobile phone number
# debugger
client.messages.create(
  from: Rails.application.credentials.twilio[Rails.env.to_sym][:phone_number],
  to: to,
  body: "Another test text"
)