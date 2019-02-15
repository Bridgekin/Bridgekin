class NotificationMailer < ApplicationMailer
  def weekly_update(user, new_opportunities_count)
    @user = user
    @new_opportunities_count = new_opportunities_count
    mail(to: @user.email, subject: "Your Weekly Summary - Bridgekin")
  end
end
