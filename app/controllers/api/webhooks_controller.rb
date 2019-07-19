class Api::WebhooksController < ApiController
  FCVARS = {
    "email" => :email,
    "twitter" => :twitter_handle,
    "location" => :location,
    "title" => :position,
    "organization" => :company,
    "linkedin" => :linkedin_url,
    "facebook" => :facebook_url
  }

  def full_contact_people
    if response.status < 300
      contact = SalesContact.find(params["contact_id"])
      if params["status"].nil?
        unless contact.nil?
          #Set basic information
          FCVARS.each do |key, value|
            contact[value] = params[key] if params[key].present?
          end
          #Set Avatar
          contact.grab_avatar_image(params["avatar"]) if params["avatar"]
          #Normalize Location
          if contact.normalize_location_and_delete?(params["location"])
            contact.destroy
          else
            #Save Record
            contact.last_full_contact_lookup = DateTime.now
            contact.save
          end
        end
      elsif params["status"] === 404
        logger.debug "Not Found"
        unless contact.nil?
          contact.last_full_contact_lookup = DateTime.now
          contact.save
        end
      elsif params["status"] === 403
        logger.error "Rate Limit hit"
      end
    else 
      logger.debug "Not Found"
    end

    render json:["Success"], status: 200
  end
end
