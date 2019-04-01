class UpdateEmailTemplates < ActiveRecord::Migration[5.2]
  def change
    EmailTemplate.where(template_type: ["connection_direct", "connection_referral", "waitlist_referral_new"])
      .delete_all

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "${this.currentUser.fname} ${this.currentUser.lname} is interested " +
      'in connecting with you about your opportunity: "${this.title}."' +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "connected_opportunity_with_connection",
      subject: subject,
      body: body
    )

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "${this.currentUser.fname} ${this.currentUser.lname} has a person "+
      'in their network that may be a good fit for your opportunity: "${this.title}."' +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "facilitated_opportunity_with_connection",
      subject: subject,
      body: body
    )

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "We’re excited to introduce you to ${this.currentUser.fname} ${this.currentUser.lname}, " +
      'who is interested in connecting with you about your opportunity: "${this.title}."' +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "connected_opportunity_no_connection",
      subject: subject,
      body: body
    )

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "We’re excited to introduce you to ${this.currentUser.fname} " +
      "${this.currentUser.lname}, who has a person in their network " +
      'that may be a good fit for your opportunity: "${this.title}."' +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "facilitated_opportunity_no_connection",
      subject: subject,
      body: body
    )

    subject = "${this.currentUser.fname} ${this.currentUser.lname} referral - Bridgekin private network"
    body = "${this.currentUser.fname} has sent you a private invitation to be a " +
      "part of their trusted network on Bridgekin, so he can share relevant business " +
      "opportunities with you. We’ll be opening up the platform to invited members " +
      "shortly, but in the meantime you’ve been added to our waitist."

    EmailTemplate.create(
      template_type: "waitlist_referral_new",
      subject: subject,
      body: body
    )
  end
end
