json.user do
  json.extract! user, :id, :name, :confirmed_at
end

json.token token
