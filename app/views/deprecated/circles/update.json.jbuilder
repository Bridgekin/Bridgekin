json.circle do |json|
  json.partial! 'api/circles/circle', circle: @circle
end
