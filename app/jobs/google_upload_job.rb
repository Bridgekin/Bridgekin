class GoogleUploadJob < ApplicationJob
  queue_as :default

  def perform(entry, current_user)
    if entry["name"].blank?
      debugger
    end
    #Set Contact's Name
    name = Nameable.parse(entry['name'])
    begin
      #Raise error if no contact
      raise 'Fname or Lname not provided' if name.last.nil? || name.first.nil?
      #Get Contact
      contact = SalesContact.find_similar_or_initialize_by("google", {
        email: entry['email'],
        fname: name.first,
        lname: name.last
      })
      #Set Source
      contact.setSource(:google_upload)
      #Save Contact
      if contact.save!
        #Check if contact and user are already friends
        unless current_user.sales_contacts.include?(contact)
          SalesUserContact.create(
            user_id: current_user.id,
            contact_id: contact.id
          )
        end
        # Kickoff Full Contact
        if contact.email.present? && 
          contact.last_full_contact_lookup.nil? &&
          Rails.env == "production"

          FullContactJob.perform_later("people", email: contact.email, contact_id: contact.id)
        end
      end
    rescue => e
      logger.error "Couldn't save record because #{e.message}"
      #save failed upload
      FailedUpload.create(
        uploader_id: current_user.id,
        source: "google",
        email: entry['email'],
        fname: name.first,
        lname: name.last
      )
    end
  end
end