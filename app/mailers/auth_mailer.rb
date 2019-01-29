class AuthMailer < Devise::Mailer
  # helper :application
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'

  def confirmation_instructions(record, token, options={})
    # Use different e-mail templates for signup e-mail confirmation and for when a user changes e-mail address.
    if record.pending_reconfirmation?
      options[:template_name] = 'reconfirmation_instructions'
      options[:subject] = "Bridgekin email confirmation"
     else
      options[:template_name] = 'confirmation_instructions'
    end

    super
  end

  def email_changed(record, options={})
    options[:template_name] = 'email_changed'
    super
  end

  def password_change(record, options={})
    options[:template_name] = 'password_change'
    super
  end

end
