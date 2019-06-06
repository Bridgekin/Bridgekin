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
    @currentUser = User.new(user_params)

    if @referralLink && @referralLink[:status] == 'Active' && @currentUser.save
      #Check for a single use code
      @referralLink.consume_charge(@currentUser.id)
      # UserMailer.register_email(@currentUser).deliver_now
      # sign_in User, @currentUser
      # current_user.send_confirmation_email
      @token = get_login_token!(@currentUser)
      @network = @referralLink.network

      @currentUser.implement_trackable
      @site_template = @currentUser.get_template

      #set networks
      @currentUser.set_networks(@network) if @network

      #Remove waitlist user from waitlist by changing status
      @currentUser.update_waitlist

      #Connect new user with any people who's referred them, incluing
      #the referral link owner
      @currentUser.set_connections(@referralLink)

      @currentUser[:referred_by_id] = @referralLink[:member_id]
      @currentUser.save

      @users = [@currentUser]
      #Pull connections
      @connections = @currentUser.connections
      if referral_link.is_friendable
        @users << referral_link.owner
      end
      #Get User feature set
      @user_feature = @currentUser.user_feature ||
        UserFeature.create(user_id: @currentUser.id)

      render :create
    elsif @referralLink.nil?
      render json: ["Invalid referral link"], status: 401
    elsif @referralLink[:status] != "Active"
      render json: ["Referral link has already been claimed"], status: 401
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
    received_params = params.require(:user).permit(:email, :fname, :lname, :phone_number, :city, 
    :state, :country, :password, :membership_type,
    :password_confirmation, :password_digest)

    received_params[:password_confirmation] = received_params[:password]
    received_params[:email].downcase!
    received_params
  end
end
