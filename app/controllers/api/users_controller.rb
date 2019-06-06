require_relative '../concerns/devise_controller_patch.rb'
class Api::UsersController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user, except: [:destroy_by_email, :hire_signup]

  after_action :verify_authorized, only: [:update, :destroy]
  # after_action :verify_policy_scoped, only: :index

  def show
    @user = User.find(params[:id])
    # authorize @user
    render :show
  end

  def hire_signup
    @currentUser = User.new(user_params)
    @currentUser.phone_number = @currentUser.phone_number
    if @currentUser.save
      @token = get_login_token!(@currentUser)
      @currentUser.implement_trackable
      @site_template = @currentUser.get_template

      #Remove waitlist user from waitlist by changing status
      @currentUser.update_waitlist
      #Create array of user info
      @users = [@currentUser]
      #Get User feature set
      @user_feature = @currentUser.user_feature ||
        UserFeature.create(user_id: @currentUser.id)
      #Set hire user setting
      @user_feature.hire_user = true
      @user_feature.save
      #No friends yet = Empty object to fill connections
      @connections = {}

      render :hire_signup
    else
      render json: @currentUser.errors.full_messages, status: 422
    end
  end

  def update
    #Check if current password exists and is correct
    authorize @user

    if params[:user][:current_password] &&
      !@user.valid_password?(params[:user][:current_password])
      render json: ["Current password is incorrect"], status: 422
    elsif @user.update(user_params)
      AuthMailer.email_changed(@user).deliver_now if params[:user][:email]
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def add_external_user
    email, fname = params[:user][:email], params[:user][:fname]
    @link = ReferralLink.new(
      member_id: @user.id,
      network_id: Network.find_by(title: 'Bridgekin').id,
    )
    if @link.save
      InviteMailer.invite_external_user(email, fname, @link.referral_code, @user).deliver_later
      render json: ['Link made, invite sent'], status: 200
    else
      render json: @link.errors.full_messages, status: 422
    end
  end

  def destroy
    authorize @user

    if @user.destroy
      logout!
      render json: ["you deleted your account"]
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy_by_email
    @user = User.find_by(email: params[:email])
    if Rails.env.development? && @user && @user.destroy
      render json: ["you deleted your account"]
    else
      # render json: @user.errors.full_messages, status: 422
      render json: ["No user found"], status: 204
    end
  end

  def search_bar
    input = params[:search_input].split(' ');
    @users = []

    if (input.length > 1)
      fname = input[0]
      lname = input[1]
      @users = User.where("LOWER(fname) LIKE ?" , "%" + fname.downcase + "%")
        .where("LOWER(lname) LIKE ?" , "%" + lname.downcase + "%")
        .where(searchable: true)
        .where.not(id: @user)
        .or(User.where("LOWER(fname) LIKE ?" , "%" + lname.downcase + "%")
          .where("LOWER(lname) LIKE ?" , "%" + fname.downcase + "%")
          .where(searchable: true)
          .where.not(id: @user))
    else
      # debugger
      @users = User.where("LOWER(fname) LIKE ?" , "%" + input[0].downcase + "%")
        .where(searchable: true)
        .or(User.where("LOWER(lname) LIKE ?" , "%" + input[0].downcase + "%")
          .where(searchable: true))
    end

    @search_users = @users.pluck(:id)
    # @search_users = @opportunities.pluck(:id)
    render :searchBar
  end

  # def profile
  #   @user = User.find(params[:id])
  #   render :profile
  # end

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      user = params.require(:user).permit(:email, :fname, :lname,
        :phone_number, :city, :state, :country, :password,
        :membership_type, :password_confirmation,
        :password_digest, :title, :company, :profile_pic,
        :default_network_id, :linked_in_url)

      user[:searchable] = params[:user][:searchable] == 'true' unless params[:user][:searchable].nil?
      user
    end
end
