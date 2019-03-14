json.circle do |json|
  json.partial! 'api/circles/circle', circle: @circle
end

json.circleMemberIds do
  json.set! @circle.id do
    @circle.user_circles.pluck(:member_id)
  end
end

json.users do
  @circle.members.each do |member|
    json.set! member.id do
      json.partial! 'api/users/user', user: member
    end
  end
end
