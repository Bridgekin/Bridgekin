class UtilMailer < ApplicationMailer
  def send_sub_confirmation_email(charge, subscription, payer, product)
    @charge, @payer, @product, @subscription= charge, payer, product, subscription
    subject = "We've renewed your subscription"
    mail(to: @payer.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @payer.id,
      email_type: 'send_sub_confirmation_email'
    )
  end

  def sub_card_declined_email(charge, payer, product)
    @charge, @payer, @product = charge, payer, product
    subject = "Your card was declined"
    mail(to: @payer.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @payer.id,
      email_type: 'sub_card_declined_email'
    )
  end

  def sub_renewal_failed_email(payer, product)
    @payer, @product = payer, product
    subject = "Subscription Renewal Failed"
    mail(to: @payer.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @payer.id,
      email_type: 'sub_renewal_failed_email'
    )
  end
end
