json.user do
  json.extract! variables[:user], :id, :fname, :lname, :confirmed_at
end

json.token variables[:token]
