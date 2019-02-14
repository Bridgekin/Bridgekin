FactoryBot.define do
  factory :connected_opportunity do
    opportunity
    user
    facilitator
    network
  end
end
