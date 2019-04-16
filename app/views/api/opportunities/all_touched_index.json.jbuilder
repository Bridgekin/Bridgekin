# json.user_opportunity_ids @user_opportunity_ids
json.connected_opportunity_ids @connected_opportunity_ids
json.facilitated_opportunity_ids @facilitated_opportunity_ids
json.passed_opportunity_ids @passed_opportunity_ids
json.saved_opportunity_ids @saved_opportunity_ids

json.opportunities do
  @opportunities.each do |opportunity|
    json.set! opportunity.id do
      json.partial! 'api/opportunities/opportunity',
      opportunity: opportunity
    end
  end
end

json.user_opp_permissions do
  @user_opp_permissions.each do |opp_permission|
    json.set! opp_permission.id do
      json.partial! 'api/opp_permissions/permission', opp_permission: opp_permission
    end
  end
end
