FactoryBot.define do
  factory :sales_invite do
    fname { Faker::Name.first_name }
    lname { Faker::Name.unique.last_name }
    email { Faker::Internet.unique.email}

    relationship { "both" }
    link_code { Faker::Crypto.sha1 }

    #Messy way to do this. Should revisit at some point
    trait :with_user_permission do
      after(:create) do |sales_invite, opts|
        user = sales_invite.sender
        sales_network = user.sales_networks.first

        recipient = create(:user)
        user_permission = create(:sales_user_permission, permissable: sales_network, user: recipient)
        
        sales_invite.update(user_permission: user_permission, sender: user)
      end
    end
  end
end
