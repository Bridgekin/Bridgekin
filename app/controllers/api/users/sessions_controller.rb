class Api::Users::SessionsController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:destroy]
  before_action :authenticate_user, only: [:authorize]
  # skip_before_action :verify_authenticity_token, :expect => :create
  # acts_as_token_authentication_handler_for User, only: [:destroy]

  def create
    @current_user = User.find_by(email: sign_in_params[:email].downcase)

    if @current_user && @current_user.valid_password?(sign_in_params[:password]) && @current_user.confirmed?
      #Get Tokens and track
      @token = get_login_token!(@current_user)
      @user_feature, @users = @current_user.post_auth_setup
      #Load User Networks
      @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)
      
      render :create
    elsif @current_user && !@current_user.confirmed?
      render json: ['You must to confirm your account before logging in.'], status: 404
    # elsif @current_user && !@current_user.valid_password?
    #   render json: ['You need to confirm your account before logging in.'], status: 404
    # elsif @current_user.nil?
    #   render json: ['No account associated with that email'], status: 404
    else
      render json: ['Email or password is invalid'], status: 404
    end
  end

  def authorize
    #Get Tokens and track
    @token = get_login_token!(@current_user)
    @user_feature, @users = @current_user.post_auth_setup
    #Load User Networks
    @sales_networks, @sales_user_permissions, @sales_admin_networks, @network_details = SalesNetwork.get_network_info(@current_user)
    
    render :create
  end

  def destroy
    render json: ["You've successfully signed out"], status: 200
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

end
