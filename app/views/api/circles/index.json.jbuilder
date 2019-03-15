json.circles do |json|
  @circles.each do |circle|
    json.set! circle.id do
      json.partial! 'api/circles/circle', circle: circle
    end
  end
end

json.circleMemberIds @circleMemberIds

json.users do
  @circles.each do |circle|
    circle.members.each do |member|
      json.set! member.id do
        json.partial! 'api/users/user', user: member
      end
    end
  end
end
