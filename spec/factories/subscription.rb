FactoryBot.define do
  factory :subscription do
    renewal { true }
    status { 'active' }
    duration { "monthly" }
    sub_type { "full" }

    payer
    product

    trait :active_sub do
      end_date { DateTime.now + 1.week}
    end

    trait :yearly do
      duration { "yearly"}
    end

    trait :trial do
      sub_type { "trial"}
    end

    trait :expired_sub do
      end_date { DateTime.now + 1.week}
    end

  end
end
