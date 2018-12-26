class Api::WaitlistUsersController < ApiController
  before_action :require_signed_out!, only: [:create]

  def create
    @waitlist_user = WaitlistUser.new(waitlist_user_params)

    if @waitlist_user.save!
      WaitlistUserMailer.register_email(@waitlist_user).deliver_now
      render json: { msg: ['Successfully added user to waitlist'] }, status: 201
    else
      render json: @waitlist_user.errors.full_messages, status: 422
    end
  end

  private

  def waitlist_user_params
    params.require(:user).permit(:email, :fname, :lname);
  end
end
