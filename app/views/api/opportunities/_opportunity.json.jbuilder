json.extract! opportunity, :id, :title, :description,    
  :opportunity_need, :industries, :geography, :value, :status, :deal_status, :anonymous,
  :view_type, :owner_id, :created_at

json.ownerFirstName opportunity.owner.fname
json.ownerLastName opportunity.owner.lname

json.pictureUrl nil
json.ownerPictureUrl nil

json.ownerPictureUrl url_for(opportunity.owner.profile_pic) if opportunity.owner.profile_pic.attached?
json.pictureUrl url_for(opportunity.picture) if opportunity.picture.attached?
