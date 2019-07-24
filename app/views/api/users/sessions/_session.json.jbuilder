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

json.user_feature do
  json.partial! 'api/user_features/user_feature',
  user_feature: variables[:user_feature]
end if variables[:user_feature]

json.sales_networks do
  variables[:sales_networks].each do |sales_network|
    json.set! sales_network.id do
      json.partial! 'api/sales_networks/sales_network', sales_network: sales_network
    end
  end
end

json.network_details variables[:network_details]

json.current_network_id variables[:current_network_id]

json.sales_user_networks do
  variables[:sales_user_networks].each do |sales_user_network|
    json.set! sales_user_network.network_id do
      json.partial! 'api/sales_user_networks/sales_user_network', sales_user_network: sales_user_network
    end
  end
end

json.sales_admin_networks do
  variables[:sales_admin_networks].each do |sales_admin_network|
    json.set! sales_admin_network.network_id do
      json.partial! 'api/sales_admin_networks/sales_admin_network', sales_admin_network: sales_admin_network
    end
  end
end
