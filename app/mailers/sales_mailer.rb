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

  def send_network_invite_email(sales_invite, current_user)
    @sales_invite = sales_invite
    @sales_network = sales_invite.network
    @current_user = current_user
    @recipient = sales_invite.recipient || {}
    # debugger
    @email = @recipient[:email] || @sales_invite.email
    @fname = @recipient[:fname] || @sales_invite.fname
    subject = "#{@current_user.fname.capitalize} has invited you to connect to their network on Bridgekin"
    # debugger
    mail(to: @email, subject: subject)

    EmailLog.create(
      email: @email,
      email_type: 'send_network_invitation_email'
    )
  end

  def send_user_invite_email(sales_invite, current_user)
    @sales_invite = sales_invite
    @current_user = current_user
    @recipient = sales_invite.recipient || {}

    @email = @recipient[:email] || @sales_invite.email
    @fname = @recipient[:fname] || @sales_invite.fname
    subject = "#{@current_user.fname.capitalize} has invited you to connect on Bridgekin"

    mail(to: @email, subject: subject)

    EmailLog.create(
      email: @email,
      email_type: 'send_network_invitation_email'
    )
  end

  def confirm_permission_update_email(sales_invite, old_rel, new_rel, current_user)
    @sales_invite = sales_invite
    @origin = sales_invite.network || sales_invite.sender

    @origin_name = @origin.is_a?(SalesNetwork) ? @origin[:title] : "#{@origin[:fname]} #{@origin[:lname]}"
    @current_user = current_user
    @recipient = sales_invite.recipient
    @old_rel, @new_rel = old_rel, new_rel

    subject = "#{@origin_name.capitalize} Access Change - #{@old_rel.capitalize} => #{@new_rel.capitalize}"

    mail(to: @recipient.email, subject: subject)

    EmailLog.create(
      email: @recipient.email,
      email_type: 'send_network_invitation_email'
    )
  end
  
end
