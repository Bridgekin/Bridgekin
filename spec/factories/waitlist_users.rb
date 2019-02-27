FactoryBot.define do
  factory :waitlist_user do
    fname { "John" }
    status { "Waitlist" }

    transient do
      sequence :email do |n|
        "PErson#{n}@example.com"
      end
    end

    before(:create) do |waitlist_user, evaluator|
       waitlist_user.email = evaluator.email
    end

    trait :from_referral do
      transient do
        user { create(:user) }
      end

      after(:create) do |waitlist_user, evaluator|
        from_referral_id { evaluator.user.id }
      end
    end

    trait :full_member do
      status { 'Full' }
    end
  end
end
