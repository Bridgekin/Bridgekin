FactoryBot.define do
  factory :network do
    transient do
      sequence :title do |n|
        "The Bay#{n}"
      end
    end

    before(:create) do |network, evaluator|
      network.title = evaluator.title
    end

    subtitle { 'This is a test' }

    trait :with_template do
      site_template
    end

    # transient do
    #   member_count { 4 }
    #   admin_count { 3 }
    #   opportunity_count { 3 }
    #   referral_link_count { 3 }
    # end
    #
    # after(:create) do |network, evaluator|
    #   network.members << create_list(:user, evaluator.member_count)
    #   network.admins << create_list(:user, evaluator.admin_count)
    #   network.opportunities << create_list(:opportunity, evaluator.opportunity_count, network: network)
    #   network.referral_links << create_list(:referral_link, evaluator.referral_link_count)
    # end

  end
end
