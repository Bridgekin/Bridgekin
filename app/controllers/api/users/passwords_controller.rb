require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::PasswordsController < Devise::PasswordsController
  skip_before_action :verify_authenticity_token
  include DeviseControllerPatch

  def create
    if (email =~ Devise.email_regexp).present?
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      render json: ["Not a valid email address"]
    end
  end

end
