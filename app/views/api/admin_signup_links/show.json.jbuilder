json.link do |json|
  json.partial! 'api/admin_signup_links/admin_signup_link', admin_signup_link: @admin_signup_link
end

json.sales_product do
  json.partial! 'api/sales_products/sales_product', sales_product: @sales_product
end