json.extract! opportunity, :id, :title, :description, :opportunity_need,
  :industries, :geography, :value, :status

json.pictureUrl url_for(opportunity.picture) if opportunity.picture.attached?
