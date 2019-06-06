class RefOppMailer < ApplicationMailer
  def ref_opp_apply(owner, applicant, ref_opp)
    @owner = owner
    @applicant = applicant
    @opp_title = ref_opp.title.capitalize
    subject = "You have a new job candidate!"
    #Send mail
    mail(to: applicant.email, subject: subject)
    #Log email being sent
    EmailLog.create(
      recipient_id: @owner.id,
      email_type: 'ref_opp_apply'
    )
  end
end
