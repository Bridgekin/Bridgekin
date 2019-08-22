# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(
  email: 'admin@example.com',
  password: 'bridgekin1!',
  password_confirmation: 'bridgekin1!')

AdminUser.create!(
  email: 'joe@bridgekin.com',
  password: 'bridgekin1!',
  password_confirmation: 'bridgekin1!')

AdminUser.create!(
  email: 'eric@bridgekin.com',
  password: 'bridgekin1!',
  password_confirmation: 'bridgekin1!')

#User
User.create!(
  email: 'demo@bridgekin.com',
  password: 'bridgekindemo',
  password_confirmation: 'bridgekindemo',
  confirmed_at: DateTime.now,
  confirmation_sent_at: DateTime.now,
  fname: 'Joe',
  lname: 'Demo',
  title: "Director of Testing",
  company: "Bridgekin Analytics",
  is_admin: true
)

User.create!(
  email: 'eric@bridgekin.com',
  password: 'bridgekindemo',
  password_confirmation: 'bridgekindemo',
  confirmed_at: DateTime.now,
  confirmation_sent_at: DateTime.now,
  fname: 'Eric',
  lname: 'Conway',
  title: "Software Engineer",
  company: "Bridgekin Analytics",
  is_admin: true
)

User.create!(
  email: 'try@email.com',
  password: 'bridgekindemo',
  password_confirmation: 'bridgekindemo',
  confirmed_at: DateTime.now,
  confirmation_sent_at: DateTime.now,
  fname: 'Test',
  lname: 'User',
  title: "Software Engineer",
  company: "Bridgekin Analytics",
  is_admin: true
)

# 1
SalesNetwork.create!(
  title: "Bridgekin",
  domain: "bridgekin.com"
)

#1
SalesProduct.create!(
  seats: 5,
  monthly_amount: 245,
  yearly_amount: 2340
)
#2
SalesProduct.create!(
  seats: 1,
  monthly_amount: 49,
  yearly_amount: 468
)

Subscription.create!(
  payer_id: 3,
  duration: "monthly",
  renewal: true,
  end_date: DateTime.now + 1.month,
  targetable_type: "SalesNetwork",
  targetable_id: 1,
  sub_type: "trial",
  product_id: 1
)

SalesUserPermission.create!(
  permissable_id: 1,
  permissable_type: "SalesNetwork",
  user_id: 1,
  status: "confirmed"
)

SalesUserPermission.create!(
  permissable_id: 1,
  permissable_type: "SalesNetwork",
  user_id: 2,
  status: "confirmed"
)

SalesUserPermission.create!(
  permissable_id: 1,
  permissable_type: "SalesNetwork",
  user_id: 3,
  status: "confirmed"
)

SalesAdminNetwork.create!(
  network_id: 1,
  admin_id: 3
)


