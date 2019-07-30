FactoryBot.define do
  factory :user, aliases: [:owner, :recipient, :member, :admin, :facilitator, :payer] do
    fname { Faker::Name.first_name }
    lname { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email}

    phone_number { Faker::PhoneNumber.phone_number }
    city { Faker::Address.city}
    state { Faker::Address.state }
    country { Faker::Address.country_by_code }

    faker_pass = Faker::Internet.password 
    password { faker_pass }
    password_confirmation { faker_pass }

    confirmed_at { DateTime.now}
    email_confirmed_at { DateTime.now }

    trait :uploaded do
      after(:create) do |user, opts|
        create(:user_feature, user: user)
      end
    end

    trait :with_sales_contacts do
      transient do
        contact_count { 25 }
        google { false }
        linked_in { false }
      end

      after(:create) do |user, opts|
        sales_contacts = create_list(:sales_contact, opts.contact_count, google: opts.google, linked_in: opts.linked_in)

        sales_contacts.each do |sales_contact|
          create(:sales_user_contact, contact: sales_contact, user: user)
        end
      end
    end

    trait :with_owned_sales_network do
      after(:create) do |user, opts|
        sales_network = create(:sales_network,  :with_subscription)
        create(:sales_user_network, user: user, network: sales_network)
        create(:sales_admin_network, admin: user, network: sales_network)
      end
    end

    trait :with_team_loaded_network_with_intro do
      transient do
        message { "Example message" }
        explaination { "Example explaination" }
        referral_bonus { 23 }
        referral_unit { "$" }
        intro_subject { "Example intro subject" }
        intro_body { "Example intro body" }
      end
      
      after(:create) do |user, opts|
        sales_network = create(:sales_network, :with_connected_members, :with_subscription)
        requestor = sales_network.members.first
        contact = requestor.sales_contacts.first
        create(:sales_user_network, user: user, network: sales_network)
        create(:sales_intro, contact: contact, requestor: requestor, recipient: user, message: opts.message,
        explaination: opts.explaination, referral_bonus: opts.referral_bonus, referral_unit: opts.referral_unit, intro_subject: opts.intro_subject, intro_body: opts.intro_body)
      end
    end

    trait :with_team_loaded_network do
      after(:create) do |user, opts|
        sales_network = create(:sales_network, :with_connected_members, :with_subscription)
        create(:sales_user_network, user: user, network: sales_network)
      end
    end

    trait :with_sales_networks do
      transient do
        network_count { 3 }
      end
      after(:create) do |user, opts|
        sales_networks = create_list(:sales_network, opts.network_count, :with_subscription)
        
        sales_networks.each do |sales_network|
          create(:sales_user_network, user: user, network: sales_network)
        end
      end
    end

    trait :with_sales_networks_limited do
      transient do
        network_count { 3 }
      end
      after(:create) do |user|
        sales_networks = create_list(:sales_network, network_count, :with_subscription)
        sales_networks.each do |sales_network|
          create(:sales_user_network, user: user, network: sales_network, member_type: 'limited')
        end
      end
    end
    
    trait :not_confirmed do
      confirmed_at { nil }
      email_confirmed_at { nil }
    end

    # trait :with_default_workspace do
    #   transient do
    #     default_network_id { 1 }
    #   end

    #   after(:create) do |user, evaluator|
    #     user.default_network_id = evaluator.default_network_id
    #   end
    # end

    # trait :no_invites do
    #   invites_remaining { 0 }
    # end

    # trait :is_admin do
    #   is_admin{ true }
    # end
    
    # trait :with_opportunities do
    #   transient do
    #     opp_count { 5 }
    #   end

    #   after(:create) do |user, evaluator|
    #     user.opportunities << create_list(:opportunity, evaluator.opp_count, owner: user)
    #   end
    # end
  end
end
