FactoryBot.define do
  factory :referral_link do
    owner
    network
    recipient

    trait :used do
      status { 'Inactive' }
    end

    trait :multi_use do
      usage_type { 'Multi' }
    end
  end
end
