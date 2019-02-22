json.user do
  json.partial! 'api/users/user', user: variables[:user]
end

json.token variables[:token]

json.siteTemplate do
  json.partial! 'api/site_templates/site_template', site_template: variables[:site_template]
end if variables[:site_template]

json.workspaces do
  variables[:user].member_networks.where(parent_id: nil).each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end
