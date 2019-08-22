Twilio.configure do |config|
  config.account_sid = Rails.env === "production" ? ENV['TWILIO_ACCOUNT_SID'] : Rails.application.credentials.twilio[Rails.env.to_sym][:account_sid]
  config.auth_token = Rails.env === "production" ? ENV['TWILIO_AUTH_TOKEN'] : Rails.application.credentials.twilio[Rails.env.to_sym][:auth_token]
end 