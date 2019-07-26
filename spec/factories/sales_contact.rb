FactoryBot.define do
  factory :sales_contact do
    fname { Faker::Name.first_name }
    lname { Faker::Name.last_name }
    email { Faker::Internet.unique.email}

    company {Faker::Company.name}
    position {Faker::Company.profession}

    google { false }
    linked_in { false }

    trait :fc_lookup do
      last_full_contact_lookup { DateTime.now}
    end

    factory :google_contact do
      company { nil }
      position { nil }
      google { true }
    end

    factory :linked_in_contact do
      email { nil }
      linked_in { true }
    end
  end
end
