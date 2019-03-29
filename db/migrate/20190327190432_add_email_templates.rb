class AddEmailTemplates < ActiveRecord::Migration[5.2]
  def change
    #Create Waitlist Email Template
    subject = "${this.currentUser.fname} ${this.currentUser.lname} referral - Bridgekin private network"
    body = "${this.currentUser.fname} is a member of our private Bridgekin network" +
      " and referred you to be a part of our community. We saw that you had signed up" +
      " for our waitlist, but since we’re currently invite-only, ${this.currentUser.fname}" +
      " referring you is a good thing! We’ll let you know once we begin accepting referred users." +
      "\n\nHave a great day!"

    EmailTemplate.create(
      template_type: "waitlist_referral_existing",
      subject: subject,
      body: body
    )

    subject = "${this.currentUser.fname} ${this.currentUser.lname} referral - Bridgekin private network"
    body = "${this.currentUser.fname} is a member of our private Bridgekin network" +
      " and referred you to be a part of our community. You’ve been added to our" +
      " waitlist and we’ll let you know once we begin accepting referred users." +
      "\n\nHave a great day!"

    EmailTemplate.create(
      template_type: "waitlist_referral_new",
      subject: subject,
      body: body
    )

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "We’re excited to introduce you to ${this.currentUser.fname} ${this.currentUser.lname}," +
      " who is interested in connecting with you about your opportunity: ${this.opportunity.title}." +
      "\n\nIt would probably be best for you two to jump on a quick phone call" +
      " to get to know each other and discuss this opportunity further." +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "connection_direct",
      subject: subject,
      body: body
    )

    subject = "Intro ${this.owner.fname} <> ${this.currentUser.fname}"
    body = "We’re excited to introduce you to ${this.currentUser.fname} ${this.currentUser.lname}," +
      " who has a person in their network that may be a good fit for" +
      " your opportunity: ${this.opportunity.title}." +
      "\n\nIt’s probably best to jump on a quick call to get to know each other" +
      " or loop in your contact directly ${this.currentUser.fname} to discuss" +
      " further." +
      "\n\nWe’ll let you both take it from here!"

    EmailTemplate.create(
      template_type: "connection_referral",
      subject: subject,
      body: body
    )
  end
end
