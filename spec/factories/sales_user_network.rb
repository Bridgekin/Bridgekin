FactoryBot.define do
  factory :sales_user_network do
    user
    network
    member_type { "full" }
  end
end
