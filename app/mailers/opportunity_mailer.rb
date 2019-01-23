class OpportunityMailer < ApplicationMailer
  def flag_opportunity_creation(opportunity, user)
    @opportunity = opportunity
    @user = user
    mail(to: 'joe@bridgekin.com', subject: "A new opportunity was created!")
  end
end
