FactoryBot.define do
  factory :sales_product, aliases: [:product] do
    seats { 5 }
    monthly_amount { 300 }
    yearly_amount { 3000 }
  end
end
