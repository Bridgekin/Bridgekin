json.sales_intro do
  json.partial! 'api/sales_intros/sales_intro', sales_intro: @sales_intro
end

json.sales_contact do
  json.partial! 'api/sales_contacts/sales_contact', sales_contact: @sales_contact
end