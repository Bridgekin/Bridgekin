Twilio.configure do |config|
  config.account_sid = Rails.application.credentials.twilio[Rails.env.to_sym][:account_sid]
  config.auth_token = Rails.application.credentials.twilio[Rails.env.to_sym][:auth_token]
end 