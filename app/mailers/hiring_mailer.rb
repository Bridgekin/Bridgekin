class HiringMailer < ApplicationMailer
  def notify_job_owner(ref_opp)
    @recipient = ref_opp.owner
    @ref_opp = ref_opp
    mail(to: @recipient.email, subject: "You have a new job candidate!")
    #Log email being sent
    EmailLog.create(
      recipient_id: @recipient.id,
      email_type: 'notify_job_owner'
    )
  end

  def notify_request_demo(email, fname)
    @email = email,
    @fname = fname
    mail(to: 'joe@bridgekin.com', subject: "Hiring Demo Request!")
  end

end
