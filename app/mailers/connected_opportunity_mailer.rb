class ConnectedOpportunityMailer < ApplicationMailer
  def make_connection(connected_opportunity)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @user = connected_opportunity.user

    @recipients = [@owner, @user]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: "You've got a new connection coming your way!"
    )
  end

  def make_facilitated_connection(connected_opportunity)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @facilitator = connected_opportunity.facilitator

    @recipients = [@owner, @facilitator]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: "You've got a new connection coming your way!"
    )
  end
end
