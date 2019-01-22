require_relative '../../concerns/devise_controller_patch.rb'
class Api::Users::RegistrationsController < Devise::RegistrationsController
  include DeviseControllerPatch
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:update, :destroy]
  before_action :configure_permitted_parameters
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user, only: [:update, :destroy]
  # protect_from_forgery prepend: true, with: :exception

  def create
    @referralLink = ReferralLink.find_link_by_code(params[:code])

    @user = User.new(user_params)
    if @referralLink && @referralLink[:status] == 'Active' && @user.save
      #Check for a single use code
      if @referralLink[:usage_type] == "Single"
        @referralLink[:status] = "Consumed"
        @referralLink[:recipient_id] = @user.id
        @referralLink.save
      end
      # UserMailer.register_email(@user).deliver_now
      # sign_in User, @user
      # current_user.send_confirmation_email
      @token = get_login_token!(@user)
      @network = @referralLink.network

      UserNetwork.create(network_id: @network.id, member_id: @user.id) if @network.title != 'Bridgekin'
      #Create Bridgekin Connection
      UserNetwork.create(network_id: 1, member_id: @user.id)

      #Remove waitlist user from waitlist by changing status
      waitlist_user = WaitlistUser.find_by(email: @user.email)
      if waitlist_user
        waitlist_user[:status] = 'Full'
        waitlist_user.save
      end

      render :create
    elsif @referralLink.nil?
      render json: ["Invalid referral link"], status: 401
    elsif @referralLink[:status] != "Active"
      render json: ["Referral code has already been claimed"], status: 401
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    #Check if current password exists and is correct
    if params[:user][:current_password] &&
      !@user.valid_password?(params[:user][:current_password])
      render json: ["Incorrect password"], status: 422
    end

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if @user.destroy
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
    received_params = params.require(:user).permit(:email, :fname, :lname, :phone, :city,
      :state, :country, :password, :membership_type,
      :password_confirmation, :password_digest)

    received_params[:password_confirmation] = received_params[:password]
    received_params[:email].downcase!
    received_params
  end
end
