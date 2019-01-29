# Preview all emails at http://localhost:3000/rails/mailers/waitlist_user_mailer
class WaitlistUserMailerPreview < ActionMailer::Preview
  def register_email
    WaitlistUserMailer.register_email(WaitlistUser.first)
  end

  def register_referred_email
    WaitlistUserMailer.register_referred_email(WaitlistUser.first, User.first)
  end

  def register_referred_email_existing
    WaitlistUserMailer.register_referred_email_existing(WaitlistUser.first, User.first)
  end
end
