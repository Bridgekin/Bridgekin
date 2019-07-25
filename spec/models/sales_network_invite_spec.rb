require 'rails_helper'

RSpec.describe SalesNetworkInvite, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "sales_network_invite" do
    describe ".prep_batch_create" do
      it "return an array of objects" do
        invites = []
        3.times do
          invites << {
            email: Faker::Internet.unique.email,
            fname: Faker::Name.first_name,
            lname: Faker::Name.unique.last_name
          }
        end
        result = SalesNetworkInvite.prep_batch_create(invites, 1, 2)
        expect(result).to be_truthy
        expect(result.first[:sender_id]).to eq(1)
        expect(result.first[:network_id]).to eq(2)
      end

      it "return nil if any variables aren't passed" do
        result = SalesNetworkInvite.prep_batch_create
        expect(result).to be_nil
      end
    end
  end
end