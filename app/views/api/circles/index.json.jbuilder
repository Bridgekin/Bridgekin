json.circles do |json|
  @circles.each do |circle|
    json.set! circle.id do
      json.partial! 'api/circles/circle', circle: circle
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

json.circle_connections do
  @circle_connections.each do |circle_connection|
    json.set! circle_connection.id do
      json.partial! 'api/circles/circle_connection',
      circle_connection: circle_connection
    end
  end
end

# json.circleMemberIds @circleMemberIds

# json.users do
#   @circles.each do |circle|
#     circle.members.each do |member|
#       json.set! member.id do
#         json.partial! 'api/users/user', user: member
#       end
#     end
#   end
# end
