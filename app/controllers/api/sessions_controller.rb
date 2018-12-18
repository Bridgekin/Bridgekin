class Api::SessionsController < ApiController
  before_action :require_signed_out!, only: [:create]
  before_action :require_signed_in!, only: [:destroy]
  # skip_before_action :verify_authenticity_token, :expect => :create
  def create
    # @user = User.find_by(email: sign_in_params[:email])
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render :show
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  def destroy
    logout!
    render json: ["you hit the signout"]
  end

  # respond_to :json

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  # def respond_with(resource, _opts = {})
  #   render json: resource
  # end
  #
  # def respond_to_on_destroy
  #   head :no_content
  # end

end
