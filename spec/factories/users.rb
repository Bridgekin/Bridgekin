FactoryBot.define do
  factory :user, aliases: [:owner, :recipient,
    :reipient, :member, :admin, :facilitator] do
    fname { "John" }
    sequence :lname do |n|
      "Doe#{n}@example.com"
    end

    sequence :email do |n|
      "person#{n}@example.com"
    end

    phone { '4101234567'}
    city { 'San Francisco'}
    state { 'California' }
    country { 'USA' }

    password { '12345678' }
    password_confirmation { '12345678' }

    confirmed_at { DateTime.now}
    email_confirmed_at { DateTime.now }

    invites_remaining { 3 } #Old

    trait :with_networks do
      transient do
        networks { [] }
      end

      after(:create) do |user, evaluator|
        networks.each{|network| user.member_networks << network}
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
