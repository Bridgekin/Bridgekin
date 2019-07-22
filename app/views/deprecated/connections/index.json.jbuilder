json.connections do
  @connections.each do |connection|
    json.set! connection.id do
      json.partial! 'api/connections/connection', connection: connection
    end
  end
end

json.users do
  @connections.each do |connection|
    requestor = connection.requestor
    recipient = connection.recipient

    json.set! requestor.id do
      json.partial! 'api/users/user', user: requestor
    end
    json.set! recipient.id do
      json.partial! 'api/users/user', user: recipient
    end
  end
end
