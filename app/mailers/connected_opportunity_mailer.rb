class ConnectedOpportunityMailer < ApplicationMailer
  def make_connection(connected_opportunity)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @user = connected_opportunity.user

    @recipients = [@owner, @user]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: "Intro #{@owner.fname.capitalize} <> #{@user.fname.capitalize}"
    )
  end

  def make_connection_template(connected_opportunity, subject, body)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @user = connected_opportunity.user
    @body = body

    @recipients = [@owner, @user]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: subject
    )
  end

  def make_facilitated_connection(connected_opportunity)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @facilitator = connected_opportunity.facilitator

    @recipients = [@owner, @facilitator]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: "Intro #{@owner.fname.capitalize} <> #{@facilitator.fname.capitalize}"
    )
  end

  def make_facilitated_connection_template(connected_opportunity, subject, body)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @facilitator = connected_opportunity.facilitator
    @body = body

    @recipients = [@owner, @facilitator]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: subject
    )
  end
end
