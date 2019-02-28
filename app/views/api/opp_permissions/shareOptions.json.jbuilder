json.shareOptions @share_options

json.networks do
  @networks.each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.connections do
end
