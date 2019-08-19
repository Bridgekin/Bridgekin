FactoryBot.define do
  factory :sales_user_permission do
    relationship { "both" }

    trait :confirmed do
      status { "confirmed" }
    end
  end
end
