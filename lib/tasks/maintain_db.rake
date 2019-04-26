def log(msg)
  puts msg
  Rails.logger.info(msg)
end

namespace :maintain_db do
  desc "Update email templates with new info"
  task update_email_templates: :environment do
    # Your code goes here
    # log('Updating database with new email templates')

    #Update Waitlist Email Template
    subject = "${this.currentUser.fname} ${this.currentUser.lname} private invite - Bridgekin"
    body = "@user.fname.capitalize %> is a member of our private Bridgekin network" +
      " and referred you to be a part of our community. We saw that you had signed up" +
      " for our waitlist, but since we’re currently invite-only <%= @user.fname.capitalize %>" +
      " referring you is a good thing! We’ll let you know once we begin accepting referred users." +
      "\n\nHave a great day!"

    template = EmailTemplate.find_by(template_type: "waitlist_referral_existing",)
    template.update(subject: subject, body: body)

    #Update Waitlist Email Template (Existing New)
    subject = "${this.currentUser.fname} ${this.currentUser.lname} private invite - Bridgekin"
    body = "${this.currentUser.fname} has sent you an exclusive invitation to" +
      " be a part of their trusted network on Bridgekin, so they can privately" +
      " share relevant business opportunities with you. We’re currently reviewing" +
      " your invitation request and you should receive an email with your private" +
      " link to join the platform shortly."

    template = EmailTemplate.find_by(template_type: "waitlist_referral_new",)
    template.update(subject: subject, body: body)

    #Create Referreted Direct Approval

    subject = "${this.currentUser.fname} ${this.currentUser.lname} private invite - Bridgekin"
    body = "${this.currentUser.fname} has sent you an exclusive invitation to" +
      " be a part of their trusted network on Bridgekin and has a business opportunity" +
      " they’d like to privately share with you. We’re currently reviewing your" +
      " invitation request and you should receive an email with your private" +
      " invitation link shortly."

    EmailTemplate.create(
      template_type: "waitlist_referred_direct_approve",
      subject: subject,
      body: body
    )
  end
end
