class Api::WebhooksController < ApiController
  def clearbit
    webhook = Clearbit::Webhook.new(request.env)
    # debugger

    # case webhook.type
    # when 'person'
    #   debugger
    #   person = Person.find(webhook.id)
    #   person.clearbit = webhook.body
    #   person.unknown  = webhook.status == 404
    #   person.save
    # end

    # if webhook.body.person

    head 200
  end

  FCVARS = {
    "email" => :email,
    "twitter" => :twitter_handle,
    "location" => :location,
    "title" => :position,
    "organization" => :company,
    "linkedin" => :linkedin_url,
    "facebook" => :facebook_url
  }

  def full_contact
    begin
      if params["status"].nil?
        contact = SalesContact.find_by(email: params["details"]["emails"][0]["value"])
        unless contact.nil?
          #Set basic information
          FCVARS.each do |key, value|
            if params[key].present?
              contact[value] = params[key]
            end
          end
          #Set Avatar
          contact.grab_avatar_image(params["avatar"]) if params["avatar"]
          #Set Name // Don't change name yet
          # if person["fullName"].present?
          #   name = Nameable.parse(person["fullName"])
          #   contact.fname = name.first
          #   contact.lname = name.last
          # end
          contact.last_full_contact_lookup = Datetime.now
          contact.save
        end
      end

      render json:["Success"], status: 200
    rescue
      logger.debug "No email found or Error"
    end
  end
end
