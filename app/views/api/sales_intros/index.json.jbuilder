json.sales_intros do
  @intro_requests.each do |sales_intro|
    json.set! sales_intro.id do
      json.partial! 'api/sales_intros/sales_intro', sales_intro: sales_intro
    end
  end
end

json.requests_sent @requests_sent

json.requests_received @requests_received

json.actors do
  @actors.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

json.sales_contacts do
  @sales_contacts.each do |sales_contact|
    json.set! sales_contact.id do
      json.partial! 'api/sales_contacts/sales_contact', sales_contact: sales_contact
    end
  end
end