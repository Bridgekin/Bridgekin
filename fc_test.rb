require 'rest-client'
require 'json'
require 'pry'

response = RestClient.post("https://api.fullcontact.com/v3/person.enrich",
  {
    "email" => "fakeemail@email.com"
  }.to_json,
  {
    :authorization => "Bearer aLGVGrpeBhBvt0eAn04z3uBnjlkl6WUQ"
  })
# response = RestClient.get("https://autocomplete.clearbit.com/v1/companies/suggest?query=microsoft")
  # "email" => "eaconwayjr@gmail.com"
  # "phone" => "+14436326422"
  # "fullName" => "Sam Winter"

parsed = JSON.parse(response.body)

binding.pry

puts parsed