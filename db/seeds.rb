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

User.create!(
  email: 'demo@bridgekin.com',
  password: 'bridgekindemo',
  password_confirmation: 'bridgekindemo',
  confirmed_at: DateTime.now,
  confirmation_sent_at: DateTime.now,
  fname: 'Joe',
  lname: 'Demo'
)

Network.create!(
  title: 'Bridgekin'
)

Opportunity.create!(
  owner_id: 1,
  title: 'Test - Amazing castle opportunity in France',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat orci sit amet neque consectetur imperdiet. Duis augue libero, eleifend ut tristique sit amet, volutpat in nisl.',
  opportunity_needs: "Raise Capital",
  industries: ["Education", "Technology", "Internet"],
  geography: ["Worldwide"],
  value:  "$1M - $5M",
  status: "Approved",
)

Opportunity.create!(
  owner_id: 2,
  title: 'Test - Amazing castle opportunity in Czech',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras placerat orci sit amet neque consectetur imperdiet. Duis augue libero, eleifend ut tristique sit amet, volutpat in nisl.',
  opportunity_needs: "Raise Capital",
  industries: ["Education", "Technology", "Internet"],
  geography: ["Worldwide"],
  value:  "$1M - $5M",
  status: "Approved"
)
