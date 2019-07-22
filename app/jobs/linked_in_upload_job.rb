class LinkedInUploadJob < ApplicationJob
  queue_as :default

  def perform(entry, current_user)
    begin
      #Get Contact
      contact = SalesContact.find_similar_or_initialize_by("linkedin", current_user, {
        fname: entry["First Name"],
        lname: entry["Last Name"],
        company: entry["Company"],
        position: entry["Position"]
      })
      contact.email = entry["Email Address"] if entry["Email Address"].present? && contact.email.blank?
      #Set Source
      contact.setSource(:linked_in_upload)
      if contact.save
        #Check if contact and user are already friends
        unless current_user.sales_contacts.include?(contact)
          current_user.sales_user_contacts.create(contact: contact)
        end
        # company = contact.sales_company
        # unless company.nil?
          # HunterJob.perform_later(company, contact) if company.domain.present?
        # end
      end
    rescue => exception
      #save failed upload
      FailedUpload.create(
        uploader_id: current_user.id,
        source: "linkedin",
        fname: entry["First Name"],
        lname: entry["Last Name"],
        company: entry["Company"],
        position: entry["Position"]
      )
    end
  end
end