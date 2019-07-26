FactoryBot.define do
  factory :sales_user_network do
    user
    member_type { "full" }
  end
end
