json.shareNetworks do
  @user.member_networks.pluck(:id)
end

json.networks do
  @user.member_networks do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.shareConnections do
end

json.connections do
end
