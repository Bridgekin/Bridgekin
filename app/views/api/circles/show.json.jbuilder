json.circle do |json|
  json.partial! 'api/circles/circle', circle: @circle
end

json.circleMemberIds @circleMemberIds

json.users do
  @circle.members.each do |member|
    json.set! member.id do
      json.partial! 'api/users/user', user: member
    end
  end
end
