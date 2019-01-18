require_relative '../concerns/devise_controller_patch.rb'
class Api::UsersController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user

  after_action :verify_authorized, except: :index
  # after_action :verify_policy_scoped, only: :index

  def show
    @user = User.find(params[:id])
    authorize @user
    render :show
  end

  def update
    #Check if current password exists and is correct
    authorize @user

    if params[:user][:current_password] &&
      !@user.valid_password?(params[:user][:current_password])
      render json: ["Current password is incorrect"], status: 422
    elsif @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
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

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      user = params.require(:user).permit(:email, :fname, :lname,
        :phone, :city, :state, :country, :password,
        :membership_type, :password_confirmation,
        :password_digest, :title, :company, :profile_pic)
    end
end
