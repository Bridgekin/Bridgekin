class Api::SessionsController < Devise::SessionsController
  # skip_before_action :verify_authenticity_token, :expect => :create
  def create
    @user = User.find_by(email: sign_in_params[:email])

    if @user && @user.valid_password?(sign_in_params[:password])
      @current_user = @user
      render :show
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  # def create
  #   @user = User.find_by(email: params[:email])
  #   # debugger
  #   if @user&.valid_password?(params[:password])
  #     render @user.as_json(only: [:id, :email]), status: :created
  #   else
  #     # render json: ["Incorrect password!"]
  #     head(:unauthorized)
  #   end
  #
  # end
  #
  def destroy
    # logout!
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
