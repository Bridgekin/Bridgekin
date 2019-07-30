FactoryBot.define do
  factory :sales_product, aliases: [:product] do
    seats { 5 }
    monthly_amount { 300 }
    yearly_amount { 3000 }

    trait :with_signup_link do
      transient do
        code { Faker::Crypto.sha1 }
      end

      after(:create) do |product, eval|
        create(:admin_signup_link, product: product, code: eval.code)
      end
    end
  end
end
