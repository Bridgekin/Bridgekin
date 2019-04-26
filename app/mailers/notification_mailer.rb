class NotificationMailer < ApplicationMailer
  def weekly_update(user, new_opportunities_count)
    @user = user
    @new_opportunities_count = new_opportunities_count
    mail(to: @user.email, subject: "Your Weekly Summary - Bridgekin")
  end

  def direct_opportunity_received(userId, senderId)
    @user = user
    @sender = sender
    subject = "#{@sender.fname.capitalize} #{@sender.lname.capitalize} has directly sent you an opportunity"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'direct_opportunity_received',
      sender_id: senderId
    )
  end

  def opportunity_from_contacts(userId, senderId)
    @user = user
    @sender = sender
    subject = "#{@sender.fname.capitalize} #{@sender.lname.capitalize} has shared an opportunity with you"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'opportunity_from_contacts',
      sender_id: senderId
    )
  end

  def invitation_request(userId, requestorId)
    @user = user
    @requestor = requestor
    subject = "#{@requestor.fname.capitalize} #{@requestor.lname.capitalize} would like to add you to their trusted network"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'invitation_request',
      sender_id: senderId
    )
  end

  def opps_from_contacts_summary(user, opps_count, type)
    @user = user
    @opps_count = opps_count
    @wording = determineWording(type)
    subject = "Your trusted contacts #{type} opportunity recap"
    mail(to: @user.email, subject: subject)
  end

  def opps_within_Bridgekin_summary(user, opps_count, type)
    @user = user
    @opps_count = opps_count
    @wording = determineWording(type)
    subject = "Bridgekin Network #{type} opportunity recap"
    mail(to: @user.email, subject: subject)
  end

  #### UTIL
  def determineWording(type)
    case type
    when 'daily'
      'day'
    when 'weekly'
      'week'
    when 'monthly'
      'month'
    else
      ''
    end
  end
end
