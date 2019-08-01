require 'rails_helper'

RSpec.describe SalesNetwork, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "sales_network:" do
    describe "generate_network_details" do
      before(:each) do
        @sales_network1 = create(:sales_network, :with_subscription, :with_members)
        @sales_network2 = create(:sales_network, :with_subscription, :with_members)
      end

      it "should return values for each network" do
        result = SalesNetwork.generate_network_details([@sales_network1, @sales_network2])
        expect(result[@sales_network1.id]).to be_truthy
        expect(result[@sales_network2.id]).to be_truthy
      end

      # it "should return an empty {} if an array isn't passed" do
      #   result = SalesNetwork.generate_network_details(@sales_network1)
      #   expect(result).to eq({})
      # end
    end

    describe "get_network_info" do
      context "with full user" do
        it "should get all values" do
          @user = create(:user, :with_sales_networks)
          sales_networks, sales_user_permissions, sales_admin_networks, network_details = SalesNetwork.get_network_info(@user)
          expect(sales_networks.length).to be > 0
          expect(sales_user_permissions.length).to be > 0
        end

        it "should handle cases for users without networks" do
          @user = create(:user)
          result = SalesNetwork.get_network_info(@user)
          expect(result).to be_nil
        end

        it "should return nil if no user is passed" do
          result = SalesNetwork.get_network_info
          expect(result).to be_nil
        end

        it "should return nil if a value other than a user is passed" do
          result = SalesNetwork.get_network_info('hello')
          expect(result).to be_nil
        end
      end

      context "with limited user" do
        it "should get all values" do
          @user = create(:user, :with_sales_networks)
          sales_networks, sales_user_permissions, sales_admin_networks, network_details = SalesNetwork.get_network_info(@user)
          expect(sales_networks.length).to be > 0
          expect(sales_user_permissions.length).to be > 0
        end
      end

    end

    describe "get_member_type" do
      before(:each) do
        @user = create(:user)
        @sales_network = create(:sales_network, :with_subscription)
        @sales_user_permission = create(:sales_user_permission, permissable: @sales_network, user: @user)
      end

      it "should return member type when passed a user" do
        result = @sales_network.get_member_type(@user)
        expect(result).to eq('full')
      end

      it "should return nil if passed nil or something other than a user" do
        result = @sales_network.get_member_type('hello')
        expect(result).to be_nil
        result = @sales_network.get_member_type
        expect(result).to be_nil
      end

      it "should return nil if user isn't in network" do
        @user2 = create(:user)
        result = @sales_network.get_member_type(@user2)
        expect(result).to be_nil
      end
    end

    describe ".current_subscription" do
      context "with an active sub" do
        before(:each) do
          @sales_network = create(:sales_network, :with_subscription)
        end
        it "should return the current subscription" do
          result = @sales_network.current_subscription
          expect(result.id).to be_truthy
        end
      end

      context "without an active sub" do
        before(:each) do
          @sales_network = create(:sales_network)
        end
        it "should return nil if no current subscription" do
          expect(@sales_network.current_subscription).to be_nil
        end
      end
    end
  end
end