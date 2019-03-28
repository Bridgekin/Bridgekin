class WaitlistUserMailer < ApplicationMailer
  def register_email(waitlist_user)
    @waitlist_user = waitlist_user
    mail(to: waitlist_user.email, subject: "Thanks for joining Bridgekin's waitlist!")
    @waitlist_user.track_email
  end

  def register_referred_new(waitlist_user, user)
    @waitlist_user = waitlist_user
    @user = user
    mail(to: waitlist_user.email, subject: "#{@user.fname.capitalize} #{@user.lname.capitalize} referral - Bridgekin private network")
    @user.decrement_invite_count
    @waitlist_user.track_email
  end

  def register_referred_new_template(waitlist_user, user, subject, body)
    @waitlist_user = waitlist_user
    @user = user
    @body = body
    mail(to: waitlist_user.email, subject: subject)
    @user.decrement_invite_count
    @waitlist_user.track_email
  end

  def register_referred_existing(waitlist_user, user)
    @waitlist_user = waitlist_user
    @user = user
    mail(to: waitlist_user.email, subject: "#{@user.fname.capitalize} #{@user.lname.capitalize} referral - Bridgekin private network")
    @user.decrement_invite_count
    @waitlist_user.track_email
  end

  def register_referred_existing_template(waitlist_user, user, subject, body)
    @waitlist_user = waitlist_user
    @user = user
    @body = body
    mail(to: waitlist_user.email, subject: subject)
    @user.decrement_invite_count
    @waitlist_user.track_email
  end
end
