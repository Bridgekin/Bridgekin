# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

#Use Sendgrid
# ActionMailer::Base.smtp_settings = {
#   :user_name => ENV['SENDGRID_USERNAME'],
#   :password => ENV['SENDGRID_PASSWORD'],
#   :domain => 'yourdomain.com',
#   :address => 'smtp.sendgrid.net',
#   :port => 587,
#   :authentication => :plain,
#   :enable_starttls_auto => true
# }

#Additional Logger settings
# Rails.logger = Logger.new(STDOUT)
# config.logger = ActiveSupport::Logger.new("log/#{Rails.env}.log")
# Rails.logger.datetime_format = "%Y-%m-%d %H:%M:%S"
