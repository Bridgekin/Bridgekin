json.member_user_ids @member_users.pluck(:id)

json.member_users do
  @member_users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
