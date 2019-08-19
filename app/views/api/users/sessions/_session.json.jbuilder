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
end if variables[:sales_networks]

json.network_details variables[:network_details]

json.sales_user_permissions do
  variables[:sales_user_permissions].each do |sales_user_permission|
    json.set! sales_user_permission.id do
      json.partial! 'api/sales_user_permissions/sales_user_permission', sales_user_permission: sales_user_permission
    end
  end
end if variables[:sales_user_permissions]

json.sales_admin_networks do
  variables[:sales_admin_networks].each do |sales_admin_network|
    json.set! sales_admin_network.network_id do
      json.partial! 'api/sales_admin_networks/sales_admin_network', sales_admin_network: sales_admin_network
    end
  end
end if variables[:sales_admin_networks]

json.connected_users do
  variables[:connected_users].each do |connected_user|
    json.set! connected_user.id do
      json.partial! 'api/users/user', user: connected_user
    end
  end
end if variables[:connected_users]