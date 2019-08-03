json.sales_invite do
  json.partial! 'api/sales_invites/sales_invite', sales_invite: @sales_invite
end

json.sales_network do
  json.partial! 'api/sales_networks/sales_network', sales_network: @sales_network
end unless @sales_network.nil?