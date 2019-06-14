class SalesContact
  # include Neo4j::ActiveNode
  # include Neo4j::Timestamps

  # property :email, type: String
  # property :fname, type: String
  # property :lname, type: String
  # property :company, type: String
  # property :position, type: String

  # property :linked_in, type: Boolean #Or Datetime
  # property :google, type: Boolean #Or Datetime
  # property :facebook, type: Boolean #Or Datetime

  # has_many :in, :friends,
  #   origin: :contacts, 
  #   model_class: :SalesMember

  # headerMapping = {
  #   "Email Address": :email,
  #   "First Name": :fname,
  #   "Last Name": :lname,
  #   "Company": :company,
  #   "Position": :position
  # }

  # def self.ingestLinkedIn(parsedFile, currentUserNode)
  #   failed_saved_contacts = Array.new
  #   parsedFile.each do |contact|
  #     contactNode = SalesContact.find_by(email: contact["Email Address"]) || SalesContact.new
  #     parsedFile.headers.each do |header|
  #       unless contactNode[headerMapping[header]]
  #         contactNode[headerMapping[header]] = contact[header]
  #       end
  #     end
  #     #Link Contact to Current User
  #     contactNode.friends << currentUserNode
  #     #Set Source
  #     setSource(:linked_in_upload)
  #     #Save failed contact save if needed
  #     unless contactNode.save
  #       failed_saved_contacts << {
  #         contact: contact, source: source
  #       }
  #     end
  #   end
    
  #   if failed_saved_contacts.length > 0
  #     logger.error "Failed to sync following contacts for user id #{@user.id.to_s}:" + failed_saved_contacts.to_s
  #   end
  # end

  # def setSource(source)
  #   case source
  #   when :linked_in_upload
  #     self.linked_in = true
  #   when :google_upload
  #     self.google = true
  #   when :facebook_upload
  #     self.facebook = true
  #   else 
  #   end
  # end
end
