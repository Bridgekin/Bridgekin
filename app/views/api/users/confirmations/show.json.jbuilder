# json.partial! 'api/users/sessions/session', variables: { user: @user, token: @token }

json.user do
  json.extract! @user, :id, :fname, :lname, :confirmed_at
end

json.token @token
