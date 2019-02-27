FactoryBot.define do
  factory :site_template do
    name {'test'}
    network
    # transient do
    #   network{ 1 }
    # end
    #
    # before(:create) do |site_template, evaluator|
    #   site_template.network_id = evaluator.network_id
    # end
  end
end
