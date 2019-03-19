json.networks do
  @networks.each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.circles do |json|
  @circles.each do |circle|
    json.set! circle.id do
      json.partial! 'api/circles/circle', circle: circle
    end
  end
end

json.workspaceOptions @workspaceOptions
