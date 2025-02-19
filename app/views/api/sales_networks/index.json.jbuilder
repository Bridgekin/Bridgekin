json.sales_networks do
  @sales_networks.each do |sales_network|
    json.set! sales_network.id do
      json.partial! 'api/sales_networks/sales_network', sales_network: sales_network
    end
  end
end

json.network_details @network_details

json.sales_user_permissions do
  @sales_user_permissions.each do |sales_user_permission|
    json.set! sales_user_permission.id do
      json.partial! 'api/sales_user_permissions/sales_user_permission', sales_user_permission: sales_user_permission
    end
  end
end

json.sales_admin_networks do
  @sales_admin_networks.each do |sales_admin_network|
    json.set! sales_admin_network.network_id do
      json.partial! 'api/sales_admin_networks/sales_admin_network', sales_admin_network: sales_admin_network
    end
  end
end