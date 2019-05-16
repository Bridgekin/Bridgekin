json.currentUser do
  json.partial! 'api/users/user', user: variables[:currentUser]
end

json.users do
  variables[:users].each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

json.token variables[:token]

json.siteTemplate do
  json.partial! 'api/site_templates/site_template',
  site_template: variables[:site_template]
end if variables[:site_template]

json.workspaces do
  variables[:currentUser].member_networks.where(parent_id: nil).each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.user_feature do
  json.partial! 'api/user_features/user_feature',
  user_feature: variables[:user_feature]
end if variables[:user_feature]

json.connections do
  variables[:connections].each do |connection|
    json.set! connection.id do
      json.partial! 'api/connections/connection', connection: connection
    end
  end
end
