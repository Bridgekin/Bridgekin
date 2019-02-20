json.extract! opportunity, :id, :title, :description, :opportunity_need,
  :industries, :geography, :value, :status, :deal_status, :anonymous,
  :view_type

json.ownerFirstName opportunity.owner.fname
json.ownerPictureUrl url_for(opportunity.owner.profile_pic) if opportunity.owner.profile_pic.attached?
json.pictureUrl url_for(opportunity.picture) if opportunity.picture.attached?
