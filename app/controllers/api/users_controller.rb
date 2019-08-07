require_relative '../concerns/devise_controller_patch.rb'
require 'nameable'
class Api::UsersController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user, except: [:destroy_by_email, :hire_signup, :sales_signup, :google_sales_signup, :admin_signup, :network_invite_signup]

  after_action :verify_authorized, only: [:update, :destroy]
  # after_action :verify_policy_scoped, only: :index

  def show
    @user = User.find(params[:id])
    # authorize @user
    render :show
  end

  def admin_signup
    @current_user = User.new(user_params)

    if @current_user.save_new_admin_network(
      domain_params, purchase_params) #address_params)
#Get Tokens and track
      @token = get_login_token!(@current_user)
      @user_feature, @users = @current_user.post_auth_setup   
      #Load User Networks
      @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)
      #Set as confirmed
      @current_user.update(confirmed_at: DateTime.now)

      render :signup_confirmed
    else
      render json: @current_user.errors.full_messages, status: 422
    end
  end

  def sales_invite_signup
    @current_user = User.new(user_params)
    @sales_invite = SalesInvite.includes(:network).find_by(link_code: params[:user][:code])
    network = @sales_invite.network

    if @current_user.save_from_invite( @sales_invite)
      #Get Tokens and track
      @token = get_login_token!(@current_user)
      @user_feature, @users = @current_user.post_auth_setup
      #Load User Networks
      @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)
      #Set as confirmed
      @current_user.update(confirmed_at: DateTime.now)

      render :signup_confirmed
    else
      render json: @current_user.errors.full_messages, status: 422
    end
  end

  def sales_signup
    @current_user = User.new(user_params)
    network = SalesNetwork.find_by(domain: params[:user][:domain])

    provided_email = params[:user][:email].split('@')
    provided_domain = provided_email.last.downcase unless provided_email.empty?
    
    network_domain = network.domain.downcase unless network.nil?

    if provided_domain != network_domain
      render json: ["Domain does not match chosen network"], status: 422
    elsif provided_domain == network_domain && @current_user.save
      #Attach to existing network
      @current_user.sales_user_permissions.create(permissable: network, relationship: "both", status: "confirmed", last_confirmed: DateTime.now)

      render json: ["Successful"], status: 200
    else
      render json: @current_user.errors.full_messages, status: 422
    end
  end

  def google_sales_signup
    domain = params[:user][:email].split('@').last
    network = SalesNetwork.find_by(domain: domain)
    @current_user = User.find_by(email: params[:user][:email])

    if @current_user.present? && @current_user.confirmed?
      #Get Tokens and track
      @token = get_login_token!(@current_user)
      @user_feature, @users = @current_user.post_auth_setup
      #Load User Networks
      @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)

      render :signup_confirmed
    elsif @current_user.present? && !@current_user.confirmed?
      render json: ['You must to confirm your account before logging in.'], status: 404
    elsif network.present?
      @current_user = User.new(user_params)
      if @current_user.save
        #Attach to existing network
        @current_user.sales_user_permissions.create(permissable: network, relationship: "both", status: "confirmed", last_confirmed: DateTime.now)
        #Get Tokens and track
        @token = get_login_token!(@current_user)
        @user_feature, @users = @current_user.post_auth_setup
        #Load User Networks
        @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)

        render :signup_confirmed
      else
        render json: @current_user.errors.full_messages, status: 422
      end
    else
      render json: ["Could't find a network with that domain"], status: 422
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

    def gUser_params
      params.require(:user).permit(:email, :name)
    end

    def domain_params
      params.require(:domain).permit(:title, :domain)
    end

    def purchase_params
      params.require(:purchase).permit(:duration, :renewal, :product_id, :token_id)
    end

    def address_params
      params.require(:address).permit(:line1, :city, :state, :zipcode)
    end
end
