class WaitlistUserMailer < ApplicationMailer
  def register_email(waitlist_user)
    @waitlist_user = waitlist_user
    mail(to: waitlist_user.email, subject: "Thanks for joining Bridgekin's waitlist!")
    @waitlist_user.track_email
  end

  def register_referred_email(waitlist_user, user)
    @waitlist_user = waitlist_user
    @user = user
    mail(to: waitlist_user.email, subject: "#{@user.fname} #{@user.lname} referral - Bridgekin private network")
    @user.decrement_invite_count
    @waitlist_user.track_email
  end

  def register_referred_email_existing(waitlist_user, user)
    @waitlist_user = waitlist_user
    @user = user
    mail(to: waitlist_user.email, subject: "#{@user.fname} #{@user.lname} referral - Bridgekin private network")
    @user.decrement_invite_count
    @waitlist_user.track_email
  end
end
