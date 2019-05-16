class InviteMailer < ApplicationMailer
  def invite_external_user(email, fname, code, user)
    @email, @fname, @code, @user = email, fname, code, user
    subject = "#{fname.capitalize}'s private invite - Bridgekin"
    mail(to: email, subject: subject)
  end
end
