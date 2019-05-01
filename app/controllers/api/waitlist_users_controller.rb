class Api::WaitlistUsersController < ApiController
  # before_action :require_signed_out!, only: [:create]

  def create
    existing_user = User.find_by(email: waitlist_user_params[:email])

    if existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    else
      waitlist_user = WaitlistUser.new(waitlist_user_params)
      if waitlist_user.save
        WaitlistUserMailer.register_email(waitlist_user).deliver_now
        render json: ['Successfully added user to waitlist'], status: 201
      else
        render json: waitlist_user.errors.full_messages, status: 422
      end
    end
  end

  def create_with_referral
    existing_user = User.find_by(email: waitlist_user_params[:email])
    existing_waitlist_user = WaitlistUser.find_by(email: waitlist_user_params[:email])
    @user = User.find(waitlist_user_params[:from_referral_id]) if waitlist_user_params[:from_referral_id]

    if existing_user
      render json: ["That email is already associated with an existing Bridgekin member"], status: 422
    elsif @user
      if existing_waitlist_user
        #Track latest referral
        existing_waitlist_user[:from_referral_id] = @user.id
        if existing_waitlist_user.save
          #Track list of referrals for existing users
          WaitlistUserReferral.create(
            waitlist_user_id: existing_waitlist_user.id,
            from_referral_id: @user.id
          )
          # Send email to joe
          WaitlistUserMailer.flag_waitlist_referral(@user, existing_waitlist_user, true).deliver_now

          #Send Email
          if params[:user][:subject]
            subject = params[:user][:subject]
            body = params[:user][:body]
            WaitlistUserMailer.register_referred_existing(
              existing_waitlist_user, @user, subject, body ).deliver_now
          else
            WaitlistUserMailer.register_referred_existing(
              existing_waitlist_user, @user).deliver_now
          end

          #Track notable metrics
          @user.decrement_invite_count
          existing_waitlist_user.track_email

          render :show
        else
          render json: existing_waitlist_user.errors.full_messages, status: 422
        end
      else
        waitlist_user = WaitlistUser.new(waitlist_user_params)
        if waitlist_user.save
          #Track list of referrals for existing users
          WaitlistUserReferral.create(
            waitlist_user_id: waitlist_user.id,
            from_referral_id: @user.id
          )
          # Send email to joe
          WaitlistUserMailer.flag_waitlist_referral(@user, waitlist_user, false).deliver_now

          #Send Email
          if params[:user][:subject]
            subject = params[:user][:subject]
            body = params[:user][:body]
            WaitlistUserMailer.register_referred_new(
              waitlist_user, @user, subject, body ).deliver_now
          else
            WaitlistUserMailer.register_referred_new(
              waitlist_user, @user).deliver_now
          end

          #Track notable metrics
          @user.decrement_invite_count
          waitlist_user.track_email

          render :show
        else
          render json: waitlist_user.errors.full_messages, status: 422
        end
      end
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def waitlist_user_params
    waitlist_params = params.require(:user).permit(:email, :fname, :lname,
      :from_referral_id)
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



# if waitlist_user
#   if waitlist_user.save
#     WaitlistUserMailer.register_referred_email_existing(waitlist_user, @user).deliver_now
#     # render json: ['User has already been a waitlist user'], status: 201
#     render :show
#   else
#     render json: @waitlist_user.errors.full_messages, status: 422
#   end
# else
#   waitlist_user = WaitlistUser.new(waitlist_user_params)
#   if waitlist_user.save
#     WaitlistUserMailer.register_email(@waitlist_user).deliver_now
#     # render json: ['User has already been a waitlist user'], status: 201
#     render :show
#   else
#     render json: @waitlist_user.errors.full_messages, status: 422
#   end
#
# else
#   render json: @waitlist_user.errors.full_messages, status: 422
# end
#
# if waitlist_user.save
#   WaitlistUserMailer.register_email(@waitlist_user).deliver_now
#   render json: ['Successfully added user to waitlist'], status: 201
#   # render :show
# else
#   render json: @waitlist_user.errors.full_messages, status: 422
# end
# end
