json.sales_network_invite do
  json.partial! 'api/sales_network_invites/sales_network_invite', sales_network_invite: @sales_network_invite
end

json.sales_network do
  json.partial! 'api/sales_networks/sales_network', sales_network: @sales_network
end