json.user do |json|
  json.partial! 'api/users/registrations/user', variables: { user: @user, token: @token }
end
