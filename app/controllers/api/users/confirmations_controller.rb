require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :verify_authenticity_token
  include DeviseControllerPatch

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    # yield resource if block_given?
    if resource.errors.empty?
      @user = resource
      #Get Tokens and track
      @token = get_login_token!(@currentUser)
      @site_template, @user_feature, @connections, @users = @currentUser.post_signup_setup

      redirect_to "#{root_url}accountconfirmed"
    else
      #Check if its already confirmed
      if resource.id.nil?
        redirect_to "#{root_url}confirmationerror"
      else
        redirect_to "#{root_url}sales/login"
      end
    end
  end

  def reconfirm
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    # yield resource if block_given?
    if resource.errors.empty?
      AuthMailer.email_changed(resource).deliver_now
      @user = resource
      @token = get_login_token!(@user)
      # render json: ['Account confirmed! Navigate back to the home page to login.'], status: 200

      redirect_to "#{root_url}accountconfirmed"
    else
      redirect_to "#{root_url}confirmationerror"
    end
  end

  # def confirmation_url
  #
  # end
end
