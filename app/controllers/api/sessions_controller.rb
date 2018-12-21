class Api::SessionsController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:destroy]
  # before_action :authenticate_user, only: [:destroy]
  # skip_before_action :verify_authenticity_token, :expect => :create
  # acts_as_token_authentication_handler_for User, only: [:destroy]

  def create
    @user = User.find_by(email: sign_in_params[:email])

    if @user && @user.valid_password?(sign_in_params[:password]) && @user.confirmed?
      login!(@user)
      render :show
    elsif !@user.confirmed?
      render json: { errors: ['You need to confirm your account before logging in.'] }, status: :unprocessable_entity
    else
      render json: { errors: ['Email or password is invalid'] }, status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    render json: ["you hit the signout"]
  end

  # respond_to :json

  private

  def sign_in_params
    params.permit(:email, :password)
  end

  # def respond_with(resource, _opts = {})
  #   render json: resource
  # end
  #
  # def respond_to_on_destroy
  #   head :no_content
  # end

end
