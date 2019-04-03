require_relative '../concerns/devise_controller_patch.rb'
class Api::UsersController < ApiController
  include DeviseControllerPatch
  before_action :authenticate_user

  after_action :verify_authorized, only: [:update, :destroy]
  # after_action :verify_policy_scoped, only: :index

  def show
    @user = User.find(params[:id])
    # authorize @user
    render :show
  end

  def update
    #Check if current password exists and is correct
    authorize @user

    if params[:user][:current_password] &&
      !@user.valid_password?(params[:user][:current_password])
      render json: ["Current password is incorrect"], status: 422
    elsif @user.update(user_params)
      AuthMailer.email_changed(@user).deliver_later if params[:user][:email]
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

  def search_bar
    input = params[:search_input].split(' ');
    @users = []

    if (input.length > 1)
      fname = input[0]
      lname = input[1]
      @users = User.where("LOWER(fname) LIKE ?" , "%" + fname.downcase + "%")
        .where("LOWER(lname) LIKE ?" , "%" + lname.downcase + "%")
        .where(searchable: true)
        .or(User.where("LOWER(fname) LIKE ?" , "%" + lname.downcase + "%")
          .where("LOWER(lname) LIKE ?" , "%" + fname.downcase + "%")
          .where(searchable: true))
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
        :phone, :city, :state, :country, :password,
        :membership_type, :password_confirmation,
        :password_digest, :title, :company, :profile_pic,
        :default_network_id)

      user[:searchable] = params[:user][:searchable] == 'true' unless params[:user][:searchable].nil?
      user
    end
end
