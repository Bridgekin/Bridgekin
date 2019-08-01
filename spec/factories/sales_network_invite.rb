FactoryBot.define do
  factory :sales_network_invite do
    fname { Faker::Name.first_name }
    lname { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email}

    user_type { "full" }
    link_code { Faker::Crypto.sha1 }
  end
end
