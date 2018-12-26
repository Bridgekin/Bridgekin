class Api::SessionsController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:destroy]
  before_action :authenticate_user, only: [:authorize]
  # skip_before_action :verify_authenticity_token, :expect => :create
  # acts_as_token_authentication_handler_for User, only: [:destroy]

  def create
    @user = User.find_by(email: sign_in_params[:email])

    if @user && @user.valid_password?(sign_in_params[:password]) && @user.confirmed?
      login!(@user)
      @token = get_login_token!(@user)
      render :show
    elsif !@user.confirmed?
      render json: { errors: ['You need to confirm your account before logging in.'] }, status: 404
    else
      render json: { errors: ['Email or password is invalid'] }, status: 404
    end
  end

  def authorize
    render :show
  end

  def destroy
    logout!
    render json: { msg: ["you hit the signout"] }, status: 200
  end


  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

end
