# Preview all emails at http://localhost:3000/rails/mailers/waitlist_user_mailer
class WaitlistUserMailerPreview < ActionMailer::Preview
  def register_email
    WaitlistUserMailer.register_email(WaitlistUser.first)
  end
end
