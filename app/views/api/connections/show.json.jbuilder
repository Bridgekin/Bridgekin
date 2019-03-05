json.connection do |json|
  json.partial! 'api/connections/connection', connection: @connection
end

json.users do
  requestor = @connection.requestor
  recipient = @connection.recipient

  json.set! requestor.id do
    json.partial! 'api/users/user', user: requestor
  end
  json.set! recipient.id do
    json.partial! 'api/users/user', user: recipient
  end
end
