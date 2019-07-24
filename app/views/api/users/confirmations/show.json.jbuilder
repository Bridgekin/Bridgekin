json.user do
  json.extract! @user, :id, :fname, :lname, :confirmed_at
end

json.token @token
