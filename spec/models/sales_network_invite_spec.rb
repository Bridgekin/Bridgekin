require 'rails_helper'

RSpec.describe SalesInvite, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  describe "sales_invite" do
    describe ".prep_batch_create" do
      before(:each) do
        @user = create(:user)
        @sales_network = create(:sales_network)
      end

      it "return an array of objects" do
        invites = []
        3.times do
          invites << {
            email: Faker::Internet.unique.email,
            fname: Faker::Name.first_name,
            lname: Faker::Name.unique.last_name
          }
        end
        params = {
          permissable_type: "SalesNetwork",
          permissable_id: @sales_network.id
        }
        result = SalesInvite.prep_batch_create(invites, @user, params)
        expect(result).to be_truthy
        expect(result.first[:sender_id]).to eq(@user.id)
        expect(result.first[:network_id]).to eq(@sales_network.id)
      end

      it "return nil if any variables aren't passed" do
        result = SalesInvite.prep_batch_create
        expect(result).to be_nil
      end
    end
  end
end