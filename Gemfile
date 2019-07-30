source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'
# ruby '2.3.7'

#NOTE - Check we're using 1.0 pg in gemfile lock

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false
# gem 'bootsnap', github: 'ojab/bootsnap', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem 'jquery-rails'
gem "aws-sdk-s3"

# APM
gem 'newrelic_rpm', '~> 6.0.0'

# ActiveAdmin
gem 'devise'
gem 'activeadmin'
gem 'devise-jwt'
gem 'simple_token_authentication', '~> 1.0'

#Heroku Sendgrid for emails
gem 'sendgrid-ruby'

#underscore_params
gem 'underscore_params'

gem "pundit"

gem 'pgbackups_s3'

#Schedule cron jobs beyond heroku schedulers
gem "simple_scheduler"
#scheduling
gem 'sidekiq'

gem 'heroku-deflater', :group => :production

gem 'rails_12factor', group: :production

gem 'bullet', group: 'development'
# Useful for lots of things in dev, but also for detecting classes well
gem 'binding_of_caller'

#sending text messages
gem 'twilio-ruby'

# gem 'neo4j', '~> 6.1.0'
# gem 'neo4j'
# gem 'neo4j-rake_tasks'
# gem 'neo4j-core'

gem 'clearbit'
gem 'nameable'
gem 'fullcontact'
gem 'rest-client'
gem 'scout_apm'
#Stripe
gem 'stripe', :git => 'https://github.com/stripe/stripe-ruby'

gem 'sidekiq-rate-limiter'
gem 'activejob-traffic_control'

gem "down", "~> 4.4"
gem 'mime-types'

gem "geocoder"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails', '~> 3.8'
  gem 'shoulda-matchers', git: 'https://github.com/thoughtbot/shoulda-matchers'
  #since we need to use optional
  gem 'database_cleaner'
  gem 'rails-controller-testing'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'cypress-on-rails', '~> 1.0'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'annotate'
  gem 'pry-rails'
  gem 'better_errors'
  # gem 'quiet_assets'
  gem 'rails_layout'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'phantomjs'
  gem 'poltergeist'
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'chromedriver-helper'
  gem 'stripe-ruby-mock', '~> 2.5.8', :require => 'stripe_mock'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Tracking Performance
gem "bugsnag", "~> 6.11"
gem "skylight"
gem "sentry-raven"
gem 'coffee-rails', '~> 5.0.0'
