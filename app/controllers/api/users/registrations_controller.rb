require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::RegistrationsController < Devise::RegistrationsController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:update, :destroy]
  before_action :configure_permitted_parameters
  skip_before_action :verify_authenticity_token, only: [:create]
  # protect_from_forgery prepend: true, with: :exception
  include DeviseControllerPatch

  def create
    @user = User.new(user_params)
    # debugger
    if @user.save!
      # UserMailer.register_email(@user).deliver_now
      # sign_in User, @user
      # current_user.send_confirmation_email
      @token = get_login_token!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy
      logout!
      render json: ["you deleted your account"]
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:fname,:lname])
  end

  def user_params
    params.permit(:email, :fname, :lname, :phone, :city, :state,
      :country, :password, :membership_type, :password_confirmation, :password_digest)
  end
end
