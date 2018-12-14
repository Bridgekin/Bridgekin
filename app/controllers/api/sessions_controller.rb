class Api::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, :expect => :create

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
  # def destroy
  #   # logout!
  #   render json: ["you hit the signout"]
  # end

  respond_to :json

  private

  # def session_params
  #   params.require(:user).permit(:email, :password)
  # end

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end

end
