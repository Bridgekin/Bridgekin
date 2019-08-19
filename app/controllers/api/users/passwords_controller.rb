require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::PasswordsController < Devise::PasswordsController
  skip_before_action :verify_authenticity_token
  include DeviseControllerPatch

  def create
    user = User.find_by(email: params[:email].downcase)

    # if (password_params =~ Devise.email_regexp).present?
    if user
      user.send_reset_password_instructions()
      render json: ["Sent out password reset"]
      # respond_with({}, 
      #location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      render json: ["Not a valid email address"], status: 401
    end
  end

  def update
    user = User.find_by(reset_password_token: params[:payload][:reset_token])

    if user && user.update(password_params)
      AuthMailer.password_change(user).deliver_now
      render json: ["Updated password"], status: 200
    else user.nil?
      render json: ["Recovery link has expired or is invalid"], status: 401
    end

    # self.resource = resource_class.reset_password_by_token(resource_params)
    # yield resource if block_given?
    #
    # if resource.errors.empty?
    #   resource.unlock_access! if unlockable?(resource)
    #   if Devise.sign_in_after_reset_password
    #     flash_message = resource.active_for_authentication? ? :updated : 
    #       :updated_not_active
    #     set_flash_message!(:notice, flash_message)
    #     resource.after_database_authentication
    #     sign_in(resource_name, resource)
    #   else
    #     set_flash_message!(:notice, :updated_not_active)
    #   end
    #   respond_with resource, location: after_resetting_password_path_for(resource)
    # else
    #   set_minimum_password_length
    #   respond_with resource
    # end
  end

  private

  def password_params
    params.require(:payload).permit(:password, :password_confirmation)
  end
end
