json.sales_contacts do
  @sales_contacts.each do |sales_contact|
    json.set! sales_contact.id do
      json.partial! 'api/sales_contacts/sales_contact', sales_contact: sales_contact
    end
  end
end

json.friend_users do
  @friend_users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

json.friend_map @friend_map

json.total @total