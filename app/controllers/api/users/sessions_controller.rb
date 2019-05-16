class Api::Users::SessionsController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:destroy]
  before_action :authenticate_user, only: [:authorize]
  # skip_before_action :verify_authenticity_token, :expect => :create
  # acts_as_token_authentication_handler_for User, only: [:destroy]

  def create
    @currentUser = User.includes(:notifications)
      .find_by(email: sign_in_params[:email].downcase)

    if @currentUser && @currentUser.valid_password?(sign_in_params[:password]) #&& @user.confirmed?
      @token = get_login_token!(@currentUser)

      @currentUser.implement_trackable
      @site_template = @currentUser.get_template
      @user_feature = @currentUser.user_feature ||
        UserFeature.create(user_id: @currentUser.id)

      if @user_feature.tutorial_tour_session
        @user_feature.tutorial_tour_session = nil
        @user_feature.save
      end

      @users = [@currentUser]
      @connections = @currentUser.connections
      @connections.each do |connection|
        @users << connection.requestor
        @users << connection.recipient
      end

      render :create
    # elsif @user && !@user.confirmed?
    #   render json: ['You need to confirm your account before logging in.'], status: 404
    else
      render json: ['Email or password is invalid'], status: 404
    end
  end

  def show
    #Not a working route at the moment
    @token = get_login_token!(@user)
    @site_template = @user.get_template
    @user_feature = @user.user_feature || UserFeature.create(user_id: @user.id)
    render :show
  end

  def authorize
    @token = get_login_token!(@user)
    @site_template = @user.get_template
    @user_feature = @user.user_feature || UserFeature.create(user_id: @user.id)

    @currentUser = @user
    @users = [@user]
    @connections = @user.connections
    @connections.each do |connection|
      @users << connection.requestor
      @users << connection.recipient
    end
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
