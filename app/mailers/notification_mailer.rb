class NotificationMailer < ApplicationMailer
  def weekly_update(user, new_opportunities_count)
    @user = user
    @new_opportunities_count = new_opportunities_count
    mail(to: @user.email, subject: "Your Weekly Summary - Bridgekin")
  end

  def direct_opportunity_received(userId, senderId, opportunity)
    @user = User.find(userId)
    @sender = User.find(senderId)
    @oppId = opportunity.id
    subject = "#{@sender.fname.capitalize} #{@sender.lname.capitalize} has directly sent you an opportunity"
    # @url = "https://bridgekin.com/findandconnect?focusedOppId=#{@oppId}"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'direct_opportunity_received',
      sender_id: senderId
    )
  end

  def opportunity_from_contacts(userId, senderId, opportunity)
    @user = User.find(userId)
    @sender = User.find(senderId)
    @oppId = opportunity.id
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
    @user = User.find(userId)
    @requestor = User.find(requestorId)
    subject = "#{@requestor.fname.capitalize} #{@requestor.lname.capitalize} would like to add you to their trusted network"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'invitation_request',
      sender_id: requestorId
    )
  end

  def opps_from_contacts_summary(userId, opps_count, type)
    # debugger
    @user = User.find(userId)
    @oppLang = (opps_count > 1) ? "have been #{opps_count} opportunities" :
    "has been #{opps_count} opportunity"

    @cadenceLang = determineWording(type)
    subject = "Your trusted contacts #{type.downcase} opportunity recap"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'opps_recap_from_contacts_summary'
    )
  end

  def opps_within_Bridgekin_summary(userId, opps_count, type)
    # debugger
    @user = User.find(userId)
    @oppLang = (opps_count > 1) ? "have been #{opps_count} opportunities" :
    "has been #{opps_count} opportunity"

    @cadenceLang = determineWording(type)
    subject = "Bridgekin #{type.downcase} opportunity recap"
    mail(to: @user.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: userId,
      email_type: 'opps_recap_within_Bridgekin_summary'
    )
  end

  #### UTIL
  def determineWording(type)
    case type
    when 'Daily'
      'day'
    when 'Weekly'
      'week'
    when 'Monthly'
      'month'
    else
      ''
    end
  end
end
