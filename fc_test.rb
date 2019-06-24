require 'rest-client'
require 'json'
require 'pry'

response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
  {
    "email" => "eaconwayjr@gmail.com",
  }.to_json,
  {
    :authorization => "Bearer xhE0CizNRiJ0w6EKOezqWi5n2flsA5Yj"
  })

parsed = JSON.parse(response.body)

binding.pry

puts parsed