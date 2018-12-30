class Api::UsersController < ApiController
  # before_action :require_signed_out!, only: [:create]
  # before_action :require_signed_in!, only: [:update, :destroy]

  def create
    @user = User.new(user_params)

    # unless @user.profile_pic.attached?
    #   # file = EzDownload.open('https://vignette.wikia.nocookie.net/smosh/images/e/e1/025Pikachu_OS_anime_4.png/revision/latest?cb=20140725081329')
    #   @user.profile_pic.attach(io: File.open('app/assets/images/pikachu.png'), filename: 'demo.png')
    # end

    if @user.save!
      # debugger
      UserMailer.register_email(@user).deliver_now
      # login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy
      logout!
      render json: ["you deleted your account"]
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.permit(:email, :fname, :lname, :phone, :city, :state,
      :country, :password, :membership_type, :password_confirmation, :password_digest)
  end
end
