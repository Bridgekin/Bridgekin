class ConnectedOpportunityMailer < ApplicationMailer
  def make_connected_with_connection(connected_opportunity, subject = nil, body = nil)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @user = connected_opportunity.user

    @title = @opportunity.get_title.split(" ").map{|str| str.capitalize}.join(" ")
    @subject = subject.nil? ? "Intro #{@owner.fname.capitalize} <> #{@user.fname.capitalize}" : subject
    @body = body

    @recipients = [@owner, @user]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: @subject
    )
    #Log email being sent
    EmailLog.create(
      recipient_id: @user.id,
      email_type: 'make_connected_with_connection'
    )
  end

  def make_connected_no_connection(connected_opportunity, subject = nil, body = nil)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @user = connected_opportunity.user

    @title = @opportunity.get_title.split(" ").map{|str| str.capitalize}.join(" ")
    @subject = subject.nil? ? "Intro #{@owner.fname.capitalize} <> #{@user.fname.capitalize}" : subject
    @body = body

    @recipients = [@owner, @user]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: @subject
    )
    #Log email being sent
    EmailLog.create(
      recipient_id: @user.id,
      email_type: 'make_connected_no_connection'
    )
  end


  def make_facilitated_with_connection(connected_opportunity, subject = nil, body = nil)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @facilitator = connected_opportunity.facilitator

    @title = @opportunity.get_title.split(" ").map{|str| str.capitalize}.join(" ")
    @subject = subject.nil? ? "Intro #{@owner.fname.capitalize} <> #{@facilitator.fname.capitalize}" : subject
    @body = body

    @recipients = [@owner, @facilitator]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: @subject
    )
    #Log email being sent
    EmailLog.create(
      recipient_id: @user.id,
      email_type: 'make_facilitated_with_connection'
    )
  end

  def make_facilitated_no_connection(connected_opportunity, subject = nil, body = nil)
    @opportunity = connected_opportunity.opportunity
    @owner = @opportunity.owner
    @facilitator = connected_opportunity.facilitator

    @title = @opportunity.get_title.split(" ").map{|str| str.capitalize}.join(" ")
    @subject = subject.nil? ? "Intro #{@owner.fname.capitalize} <> #{@facilitator.fname.capitalize}" : subject
    @body = body

    @recipients = [@owner, @facilitator]
    mail(
      to: @recipients.map(&:email).uniq,
      subject: @subject
    )
    #Log email being sent
    EmailLog.create(
      recipient_id: @user.id,
      email_type: 'make_facilitated_no_connection'
    )
  end
end


# def make_facilitated_connection(connected_opportunity)
#   @opportunity = connected_opportunity.opportunity
#   @owner = @opportunity.owner
#   @facilitator = connected_opportunity.facilitator
#
#   @title = @opportunity.get_title.split(" ").map{|str| str.capitalize}.join(" ")
#
#   @recipients = [@owner, @facilitator]
#   mail(
#     to: @recipients.map(&:email).uniq,
#     subject: "Intro #{@owner.fname.capitalize} <> #{@facilitator.fname.capitalize}"
#   )
# end
#
# def make_facilitated_connection_template(connected_opportunity, subject, body)
#   @opportunity = connected_opportunity.opportunity
#   @owner = @opportunity.owner
#   @facilitator = connected_opportunity.facilitator
#   @body = body
#
#   @recipients = [@owner, @facilitator]
#   mail(
#     to: @recipients.map(&:email).uniq,
#     subject: subject
#   )
# end
