FactoryBot.define do
  factory :user, aliases: [:owner, :recipient, :member, :admin, :facilitator, :payer] do
    fname { Faker::Name.first_name }
    lname { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email}

    phone_number { Faker::PhoneNumber.phone_number }
    city { Faker::Address.city}
    state { Faker::Address.state }
    country { Faker::Address.country_by_code }

    faker_pass = Faker::Internet.password 
    password { faker_pass }
    password_confirmation { faker_pass }

    confirmed_at { DateTime.now}
    email_confirmed_at { DateTime.now }

    trait :with_sales_network do
      after(:create) do |user|
        create_list(:sales_network, 3, member: user)
      end
    end

    trait :not_confirmed do
      confirmed_at { nil }
      email_confirmed_at { nil }
    end

    # trait :with_default_workspace do
    #   transient do
    #     default_network_id { 1 }
    #   end

    #   after(:create) do |user, evaluator|
    #     user.default_network_id = evaluator.default_network_id
    #   end
    # end

    # trait :no_invites do
    #   invites_remaining { 0 }
    # end

    # trait :is_admin do
    #   is_admin{ true }
    # end
    
    # trait :with_opportunities do
    #   transient do
    #     opp_count { 5 }
    #   end

    #   after(:create) do |user, evaluator|
    #     user.opportunities << create_list(:opportunity, evaluator.opp_count, owner: user)
    #   end
    # end
  end
end
