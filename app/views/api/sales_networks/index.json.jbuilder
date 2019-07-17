json.sales_networks do
  @sales_networks.each do |sales_network|
    json.set! sales_network.id do
      json.partial! 'api/sales_networks/sales_network', sales_network: sales_network
    end
  end
end

json.network_details @network_details

json.current_network_id @current_network_id

json.sales_user_networks do
  @sales_user_networks.each do |sales_user_network|
    json.set! sales_user_network.network_id do
      json.partial! 'api/sales_user_networks/sales_user_network', sales_user_network: sales_user_network
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