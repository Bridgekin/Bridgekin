FactoryBot.define do
  factory :admin_signup_link do
    code { Faker::Crypto.sha1 }

    # trait :with_product do
    #   after(:create) do |link, evaluator|
    #     create_list(:sales_product, evaluator.languages_count, admin_signup_links: [link])
    #   end
    # end
  end
end
