class Api::WaitlistUsersController < ApiController
  # before_action :require_signed_out!, only: [:create]

  def create
    @waitlist_user = WaitlistUser.new(waitlist_user_params)

    if @waitlist_user.save
      @user = User.find(waitlist_user_params[:from_referral_id]) if waitlist_user_params[:from_referral_id]

      if @user
        WaitlistUserMailer.register_referred_email(@waitlist_user, @user).deliver_now
      else
        WaitlistUserMailer.register_email(@waitlist_user).deliver_now
      end

      @waitlist_user.email_sent_at = DateTime.now
      @waitlist_user.save

      render json: ['Successfully added user to waitlist'], status: 201
    else
      render json: @waitlist_user.errors.full_messages, status: 422
    end
  end

  private

  def waitlist_user_params
    params.require(:user).permit(:email, :fname, :lname, :from_referral_id)
  end
end
