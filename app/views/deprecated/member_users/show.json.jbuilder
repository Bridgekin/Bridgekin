json.member_user do
  json.partial! 'api/users/user', user: @user
end
