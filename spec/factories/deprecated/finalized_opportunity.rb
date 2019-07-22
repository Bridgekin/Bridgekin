FactoryBot.define do
  factory :finalized_opportunity do
    opportunity
    user
    facilitator
    network
  end
end
