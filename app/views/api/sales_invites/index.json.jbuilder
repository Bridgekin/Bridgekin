json.admin_map @admin_map

json.sales_network do
  json.partial! 'api/sales_networks/sales_network', sales_network: @sales_network
end

json.sales_invites do
  @sales_invites.each do |sales_invite|
    json.set! sales_invite.id do
      json.partial! 'api/sales_invites/sales_invite', sales_invite: sales_invite
    end
  end
end