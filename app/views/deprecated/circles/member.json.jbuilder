json.circle_connection do |json|
  json.partial! 'api/circles/circle_connection',
  circle_connection: @circle_connection
end
