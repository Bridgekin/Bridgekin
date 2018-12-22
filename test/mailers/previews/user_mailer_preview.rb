# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def register_email
    UserMailer.register_email(User.first)
  end
end
