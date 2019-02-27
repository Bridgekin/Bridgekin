json.opportunities do
  @opportunities.each do |opportunity|
    json.set! opportunity.id do
      json.partial! 'api/opportunities/opportunity', opportunity: opportunity
    end
  end
end

json.opp_permissions do
  @opportunities.each do |opportunity|
    opportunity.opp_permissions do |opp_permission|
      json.set! opp_permission.id do
        json.partial! 'api/opp_permissions/permission',
        opp_permission: opp_permission
      end
    end
  end
end

json.networks do
  @opportunities.each do |opportunity|
    opportunity.networks do |network|
      json.set! network.id do
        json.partial! 'api/networks/network', network: network
      end
    end
  end
end
