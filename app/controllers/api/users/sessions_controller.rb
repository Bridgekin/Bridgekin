class Api::Users::SessionsController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:destroy]
  before_action :authenticate_user, only: [:authorize]
  # skip_before_action :verify_authenticity_token, :expect => :create
  # acts_as_token_authentication_handler_for User, only: [:destroy]

  def create
    @user = User.find_by(email: sign_in_params[:email].downcase)

    if @user && @user.valid_password?(sign_in_params[:password]) #&& @user.confirmed?
      @token = get_login_token!(@user)

      @user[:last_sign_in_at] = @user[:current_sign_in_at]
      @user[:current_sign_in_at] = DateTime.now
      @user.save
      
      render :show
    # elsif @user && !@user.confirmed?
    #   render json: ['You need to confirm your account before logging in.'], status: 404
    else
      render json: ['Email or password is invalid'], status: 404
    end
  end

  def show
    @token = get_login_token!(@user)
    render :show
  end

  def authorize
    @token = get_login_token!(@user)
    render :show
  end

  def destroy
    render json: ["You've successfully signed out"], status: 200
  end


  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

end
