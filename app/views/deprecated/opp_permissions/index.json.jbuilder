json.constructedPerms @constructed_perms

json.networks do
  @networks.each do |network|
    json.set! network.id do
      json.partial! 'api/networks/network', network: network
    end
  end
end

json.connections do
  @connections.each do |connection|
    json.set! connection.id do
      json.partial! 'api/connections/connection', connection: connection
    end
  end
end
