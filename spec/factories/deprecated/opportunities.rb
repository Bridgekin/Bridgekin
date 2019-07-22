FactoryBot.define do
  factory :opportunity do
    owner
    sequence :title do |n|
      "thisandthat#{n}"
    end
    description { 'The story of the robin'}
    opportunity_need { 'Find' }
    value { '$1-5M' }
    industries { ['Technology, Transporation']}
    geography { ['North America', 'Africa', 'Europe']}
    status { 'Pending'}

    trait :approved do
      status { 'Approved'}
    end

    trait :pending_deal do
      deal_status { 'Pending'}
    end

    trait :closed_deal do
      deal_status { 'Closed'}
    end

    trait :anonymous do
      anonyous { true }
    end

    trait :with_networks do
      transient do
        network_count { 2 }
      end

      after(:create) do |opportunity, evaluator|
        opportunity.networks << create_list(:network, evaluator.network_count)
      end
    end

    trait :with_connected_opps do
      transient do
        connected_opps_count { 2 }
      end

      after(:create) do |opportunity, evaluator|
        opportunity.connected_opportunities << create_list(:connected_opportunity, evaluator.connected_opps_count, opportunity: opportunity)
      end
    end

    trait :with_picture do
      picture { fixture_file_upload(Rails.root.join('spec', 'support', 'assets', 'mountainside_steps.jpeg'), 'image/jpeg') }
    end
  end
end
