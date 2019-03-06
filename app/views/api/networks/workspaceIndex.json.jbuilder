json.networks do
  @networks.each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.workspaceOptions @workspaceOptions
