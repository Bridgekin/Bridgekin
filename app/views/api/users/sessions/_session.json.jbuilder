json.user do
  json.partial! 'api/users/user', user: variables[:user]
end

json.token variables[:token]
