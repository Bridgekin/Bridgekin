json.sales_contacts do
  @sales_contacts.each do |sales_contact|
    json.set! sales_contact.id do
      json.partial! 'api/sales_contacts/sales_contact', sales_contact: sales_contact
    end
  end
end