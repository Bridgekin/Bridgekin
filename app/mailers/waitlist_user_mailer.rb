class WaitlistUserMailer < ApplicationMailer
  def register_email(waitlist_user)
    @waitlist_user = waitlist_user
    mail(to: waitlist_user.email, subject: "Thanks for joining Bridgekin's waitlist!")
  end
end
