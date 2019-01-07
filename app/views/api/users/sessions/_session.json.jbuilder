json.user do
  json.extract! variables[:user], :id, :fname, :lname,
  :confirmed_at, :is_admin, :title, :company
end

json.token variables[:token]
