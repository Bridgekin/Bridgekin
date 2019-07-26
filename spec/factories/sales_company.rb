FactoryBot.define do
  factory :sales_company do
    title { Faker::Company.unique.name }
    domain { Faker::Internet.unique.domain_name }
  end
end
