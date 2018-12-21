class Api::ConfirmationsController < ApiController
  def create
    @user = User.where(confirmation_token: params[:token])
    @user.confirmed_at = DateTime.now
    if @user.save!
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
end
