json.sales_networks do
  @sales_networks.each do |sales_network|
    json.set! sales_network.id do
      json.partial! 'api/sales_networks/sales_network', sales_network: sales_network
    end
  end
end