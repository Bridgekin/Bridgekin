class HiringMailer < ApplicationMailer
  def notify_job_owner(ref_opp)
    @recipient = ref_opp.owner
    @ref_opp = ref_opp
    mail(to: @recipient.email, subject: "You've got a new application")
    #Log email being sent
    EmailLog.create(
      recipient_id: @recipient.id,
      email_type: 'notify_job_owner'
    )
  end

end
