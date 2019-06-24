require 'rest-client'
require 'json'
require 'pry'

response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
  {
    "email" => "joe@bridgekin.com",
    "webhookUrl" => "http://09b95536.ngrok.io/api/webhooks/full_contact"
  }.to_json,
  {
    :authorization => "Bearer xhE0CizNRiJ0w6EKOezqWi5n2flsA5Yj"
  })

parsed = JSON.parse(response.body)

puts parsed