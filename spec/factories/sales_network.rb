FactoryBot.define do
  factory :sales_network do
    title { Faker::Company.name }
    domain { Faker::Internet.domain_name }

    trait :with_subscription do
      after(:create) do |sales_network|
        create_list(:subscription, 1, :active_sub, targetable: sales_network)
      end
    end

  end
end
