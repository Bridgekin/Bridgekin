class WaitlistUserMailer < ApplicationMailer
  def register_email(waitlist_user)
    @waitlist_user = waitlist_user
    mail(to: waitlist_user.email, subject: "Thanks for joining Bridgekin's waitlist!")
    @waitlist_user.track_email
    #Log email being sent
    EmailLog.create(
      recipient_id: @waitlist_user.id,
      email_type: 'register_email'
    )
  end

  def register_referred_new(waitlist_user, user, subject = nil, body = nil)
    #Set Variables
    @waitlist_user = waitlist_user
    @user = user
    @body = body
    subject = "#{@user.fname.capitalize} #{@user.lname.capitalize} private invite - Bridgekin" if subject.nil?
    #Send mail
    mail(to: waitlist_user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @waitlist_user.id,
      email_type: 'register_email'
    )
    # #Track notable metrics
    # @user.decrement_invite_count
    # @waitlist_user.track_email
  end

  def register_referred_existing(waitlist_user, user, subject = nil, body = nil)
    #Set Variables
    @waitlist_user = waitlist_user
    @user = user
    @body = body
    subject = "#{@user.fname.capitalize} #{@user.lname.capitalize} referral - Bridgekin private network" if subject.nil?
    #Send mail
    mail(to: waitlist_user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @waitlist_user.id,
      email_type: 'register_email'
    )
    # #Track notable metrics
    # @user.decrement_invite_count
    # @waitlist_user.track_email
  end

  def approve_waitlist_user(waitlist_user)
    @waitlist_user = waitlist_user
    subject = "#{@user.fname.capitalize} #{@user.lname.capitalize} private invite approved - Bridgekin"
    mail(to: waitlist_user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @waitlist_user.id,
      email_type: 'register_email'
    )
  end

  def referred_direct_approve(waitlist_user)
    @waitlist_user = waitlist_user
    subject = "#{@user.fname.capitalize} #{@user.lname.capitalize} private invite - Bridgekin"
    mail(to: waitlist_user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @waitlist_user.id,
      email_type: 'register_email'
    )
  end

end
