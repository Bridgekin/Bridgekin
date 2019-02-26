class Api::WaitlistUsersController < ApiController
  # before_action :require_signed_out!, only: [:create]

  def create
    existing_user = User.find_by(email: waitlist_user_params[:email])
    waitlist_user = WaitlistUser.find_by(email: waitlist_user_params[:email])

    if existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    else
      unless waitlist_user
        waitlist_user = WaitlistUser.new(waitlist_user_params)
      end

      if waitlist_user.save
        WaitlistUserMailer.register_referred_email_existing(waitlist_user, @user).deliver_now
        render json: ['Successfully added user to waitlist'], status: 201
        # render :show
      else
        render json: @waitlist_user.errors.full_messages, status: 422
      end
    end
  end

  def create_with_referral
    existing_user = User.find_by(email: waitlist_user_params[:email])
    waitlist_user = WaitlistUser.find_by(email: waitlist_user_params[:email])
    @user = User.find(waitlist_user_params[:from_referral_id]) if waitlist_user_params[:from_referral_id]

    if existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    elsif @user
      if waitlist_user
        waitlist_user[:from_referral_id] = @user.id
        if waitlist_user.save
          WaitlistUserReferral.create(
            waitlist_user_id: waitlist_user.id,
            from_referral_id: @user.id
          )
          WaitlistUserMailer.register_referred_email_existing(waitlist_user, @user).deliver_now
          # render json: ['User has already been a waitlist user'], status: 201
          render :show
        else
          render json: @waitlist_user.errors.full_messages, status: 422
        end
      else
        waitlist_user = WaitlistUser.new(waitlist_user_params)
        if waitlist_user.save
          WaitlistUserReferral.create(
            waitlist_user_id: waitlist_user.id,
            from_referral_id: @user.id
          )
          WaitlistUserMailer.register_referred_email(waitlist_user, @user).deliver_now
          # render json: ['User has already been a waitlist user'], status: 201
          render :show
        else
          render json: @waitlist_user.errors.full_messages, status: 422
        end
      end
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def waitlist_user_params
    waitlist_params = params.require(:user).permit(:email, :fname, :lname, :from_referral_id)
    waitlist_params[:email].downcase!
    waitlist_params
  end
end


# def create
#   existing_user = User.find_by(email: waitlist_user_params[:email])
#   waitlist_user = WaitlistUser.find_by(email: waitlist_user_params[:email])
#   @user = User.find(waitlist_user_params[:from_referral_id]) if waitlist_user_params[:from_referral_id]
#
#   if existing_user
#     render json: ["That email is already associated with an existing Bridgekin member"], status: 422
#   elsif waitlist_user && @user
#     waitlist_user[:from_referral_id] = @user.id
#     waitlist_user.save
#
#     WaitlistUserReferral.create(
#       waitlist_user_id: waitlist_user.id,
#       from_referral_id: @user.id
#     )
#
#     WaitlistUserMailer.register_referred_email_existing(waitlist_user, @user).deliver_now
#     # render json: ['User has already been a waitlist user'], status: 201
#     render :show
#   else
#     @waitlist_user = WaitlistUser.new(waitlist_user_params)
#
#     if @waitlist_user.save
#       if @user
#         WaitlistUserReferral.create(
#           waitlist_user_id: @waitlist_user.id,
#           from_referral_id: @user.id
#         )
#
#         WaitlistUserMailer.register_referred_email(@waitlist_user, @user).deliver_now
#       else
#         WaitlistUserMailer.register_email(@waitlist_user).deliver_now
#       end
#
#       @waitlist_user.email_sent_at = DateTime.now
#       @waitlist_user.save
#
#       # render json: ['Successfully added user to waitlist'], status: 201
#       render :show
#     else
#       render json: @waitlist_user.errors.full_messages, status: 422
#     end
#   end
# end
