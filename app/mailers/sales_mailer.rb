class SalesMailer < ApplicationMailer
  def notify_contacts_imported(current_user)
    @current_user = current_user
    mail(to: @current_user.email, subject: "We've finished uploading your contacts")
    #Log email being sent
    EmailLog.create(
      recipient_id: @current_user.id,
      email_type: 'notify_contacts_imported'
    )
  end

  def request_sales_intro(sales_intro)
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
    .find(sales_intro.id)
    @contact = @sales_intro.contact
    @requestor = @sales_intro.requestor
    @recipient = @sales_intro.recipient

    subject = "Intro Requested #{@requestor.fname.capitalize} <> #{@contact.fname.capitalize}"
    # @recipients = [@recipient, @requestor]
    mail(to: @recipient.email, subject: subject)
    # mail(
    #   to: @recipients.map(&:email).uniq,
    #   subject: subject
    # )
    #Log email being sent
    EmailLog.create(
      recipient_id: @recipient.id,
      email_type: 'request_sales_intro'
    )
  end

  def make_intro(subject, email, body, sales_intro, current_user)
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
    .find(sales_intro.id)
    @contact = @sales_intro.contact
    @requestor = @sales_intro.requestor
    @recipient = @sales_intro.recipient

    @current_user = current_user
    @email = email
    @body = body

    mail(to: @email, subject: subject, cc: [@requestor.email, @recipient.email])

    EmailLog.create(
      recipient_id: @recipient.id,
      email_type: 'request_sales_intro'
    )
    sales_intro.update(email_sent: DateTime.now)
  end

  def refuse_intro(reason, details, sales_intro)
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
    .find(sales_intro.id)
    @contact = @sales_intro.contact
    @requestor = @sales_intro.requestor
    @recipient = @sales_intro.recipient

    @reason = reason
    @details = details

    subject = "Intro Request Declined - | #{@contact.fname.capitalize} <> #{@contact.lname.capitalize}"

    mail(to: @requestor.email, subject: subject)

    EmailLog.create(
      recipient_id: @requestor.id,
      email_type: 'refuse_intro'
    )
    sales_intro.update(email_sent: DateTime.now)
  end

  def decline_intro(sales_intro)
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
    .find(sales_intro.id)
    @contact = @sales_intro.contact
    @requestor = @sales_intro.requestor
    @recipient = @sales_intro.recipient

    subject = "Intro Request Declined - | #{@contact.fname.capitalize} <> #{@contact.lname.capitalize}"

    mail(to: @requestor.email, subject: subject)

    EmailLog.create(
      recipient_id: @requestor.id,
      email_type: 'decline_intro'
    )
    sales_intro.update(email_sent: DateTime.now)
  end

  def notify_requestor_intro_sent(sales_intro, current_user)
    @sales_intro = SalesIntro.includes(:contact, :requestor, :recipient)
    .find(sales_intro.id)
    @contact = @sales_intro.contact
    @requestor = @sales_intro.requestor
    @recipient = @sales_intro.recipient

    subject = "Warm Introduction Update - #{@contact.fname.capitalize} <> #{@contact.lname.capitalize}"

    mail(to: @requestor.email, subject: subject, cc: @recipient.email)

    EmailLog.create(
      recipient_id: @requestor.id,
      email_type: 'notify_requestor_intro_sent'
    )
  end

  def send_network_invitation_email(network_invite, current_user)
    @network_invite = network_invite
    @sales_network = network_invite.network
    @current_user = current_user

    subject = "Bridgekin Network Invitation - From #{@current_user.fname.capitalize}"

    mail(to: @network_invite.email, subject: subject)

    EmailLog.create(
      email: @network_invite.email,
      email_type: 'send_network_invitation_email'
    )
  end
  
end
