FactoryBot.define do
  factory :waitlist_user do
    fname { "John" }
    sequence :email do |n|
      "PErson#{n}@example.com"
    end

    trait :from_referral do
      transient do
        user { create(:user) }
      end

      after(:create) do |waitlist_user, evaluator|
        from_referral_id { user.id }
      end
    end

    trait :full_member do
      status { 'Full' }
    end
  end
end
