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
    body = "${this.currentUser.fname} has sent you an exclusive invitation to" +
      " be a part of their trusted network on Bridgekin, so they can privately" +
      " share relevant business opportunities with you. We’re currently reviewing" +
      " your invitation request and you should receive an email with your private" +
      " link to join the platform shortly." +
      "\n\nHave a great day!"

    template = EmailTemplate.find_by(template_type: "waitlist_referral_new",)
    template.update(subject: subject, body: body)

    # log('Successfully Updated')
  end
end
