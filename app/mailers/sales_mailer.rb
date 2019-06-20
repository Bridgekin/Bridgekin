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
    @sales_intro = sales_intro.includes(:contact, :requestor, :recipient)
    @contact = @sales_intro.contact
    @requestor = @ales_intro.requestor
    @recipient = @ales_intro.recipient

    subject = "Intro Requested - Connect #{@requestor.fname.capitalize} and #{@contact.fname.capitalize}"
    # @recipients = [@recipient, @requestor]
    mail(to: @recipient.email, subject: subject)
    # mail(
    #   to: @recipients.map(&:email).uniq,
    #   subject: subject
    # )
    #Log email being sent
    EmailLog.create(
      recipient_id: @current_user.id,
      email_type: 'request_sales_intro'
    )
  end

  def make_intro(subject, email, body, sales_intro, current_user)
    # @sales_intro = sales_intro.includes(:contact, :requestor, :recipient)
    # @contact = @sales_intro.contact
    # @requestor = @ales_intro.requestor
    # @recipient = @ales_intro.recipient
    # sales_intro.update()

    @current_user = current_user
    @email = email
    @body = body

    mail(to: @email, subject: subject)

    EmailLog.create(
      recipient_id: @recipient.id,
      email_type: 'request_sales_intro'
    )
    sales_intro.update(email_sent: Datetime.now)
  end

  def refuse_intro(reason, details, sales_intro, current_user)
    @sales_intro = sales_intro.includes(:contact, :requestor, :recipient)
    @contact = @sales_intro.contact
    @requestor = @ales_intro.requestor
    @recipient = @ales_intro.recipient

    @reason = reason
    @details = details

    subject = "Request Denied - | #{contact.fname.capitalize} #{contact.lname.capitalize}"

    mail(to: @requestor.email, subject: subject)

    EmailLog.create(
      recipient_id: @requestor.id,
      email_type: 'refuse_intro'
    )
    sales_intro.update(email_sent: Datetime.now)
  end
  
end
