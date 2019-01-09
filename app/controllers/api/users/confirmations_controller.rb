require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :verify_authenticity_token
  include DeviseControllerPatch

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    # yield resource if block_given?

    if resource.errors.empty?
      @user = resource
      @token = get_login_token!(@user)
      # render :show
      render json: ['Account confirmed! Navigate back to the home page to login.'], status: 200
      # redirect_to
    else
      render json: resource.errors.full_messages, status: 422
    end
  end

  # def confirmation_url
  #
  # end
end
