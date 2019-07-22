json.direct_link do
  json.extract! @link, :opportunity_ids, :profile_id, :link_code
end

json.opportunities do
  @opportunities.each do |opportunity|
    json.set! opportunity.id do
      json.partial! 'api/opportunities/opportunity', opportunity: opportunity
    end
  end
end

json.user do |json|
  json.partial! 'api/users/user', user: @user
end
