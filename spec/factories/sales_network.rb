FactoryBot.define do
  factory :sales_network do
    title { Faker::Company.unique.name }
    domain { Faker::Internet.unique.domain_name }

    trait :with_subscription do
      after(:create) do |sales_network|
        s = create_list(:subscription, 2, :active_sub, targetable: sales_network)
      end
    end

    trait :with_members do
      transient do
        member_count { 3 }
      end
      after(:create) do |sales_network, opts|
        members = create_list(:member, opts.member_count)
        members.each do |member|
          create(:sales_user_permission, user: member, permissable: sales_network, status:"confirmed")
        end
      end
    end

    trait :with_connected_members do
      transient do
        member_count { 3 }
        contact_count { 25 }
        google { false }
        linked_in { false }
      end
      after(:create) do |sales_network, opts|
        members = create_list(:member, opts.member_count, :with_sales_contacts, contact_count: opts.contact_count, google: opts.google, linked_in: opts.linked_in)

        members.each do |member|
          create(:sales_user_permission, user: member, permissable: sales_network, status:"confirmed")
        end
      end
    end

  end
end
