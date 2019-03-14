json.circleMemberIds do
  json.set! @circle.id do
    @circle.user_circles.pluck(:member_id)
  end
end
