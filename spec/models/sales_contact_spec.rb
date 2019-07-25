require 'rails_helper'

RSpec.describe SalesContact, type: :model do
  describe "sales_contact" do
    describe ".search_contacts" do
      before(:each) do
        @member_count = 5
        @contact_count = 20
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count)
        @user = @sales_network.members.first
      end
      it "should return all members with no search" do
        result = SalesContact.search_contacts(@user, @sales_network)
        expect(result.count).to eq(@member_count * @contact_count)
      end

      it "should search by fname" do
        contact = @user.sales_contacts.first
        params = { fname: contact.fname }
        result = SalesContact.search_contacts(@user, @sales_network, "", params)
        expect(result.include?(contact)).to be_truthy
      end

      it "should search by lname" do
        contact = @user.sales_contacts.first
        params = { lname: contact.lname }
        result = SalesContact.search_contacts(@user, @sales_network, "", params)
        expect(result.include?(contact)).to be_truthy
      end
      
      it "should filter to show my contacts" do
        result = SalesContact.search_contacts(@user, @sales_network, "mine")
        expect(result.count).to eq(@user.sales_contacts.count)
      end

      it "should filter to show my team's contacts" do
        result = SalesContact.search_contacts(@user, @sales_network, "teammates")
        expect(result.count).to eq(80)
      end

      it "should filter for only google" do
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count, google: true)
        @user = @sales_network.members.first

        result = SalesContact.search_contacts(@user, @sales_network, "google")
        expect(result.count).to eq(100)
      end

      it "should filter for only linked_in" do
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count, linked_in: true)
        @user = @sales_network.members.first

        result = SalesContact.search_contacts(@user, @sales_network, "linkedIn")
        expect(result.count).to eq(100)
      end
      

      it "should return nil if it isn't passed a current _user or network" do
        result = SalesContact.search_contacts()
        expect(result.count).to be_nil
      end
    end

    describe ".prep_search_data" do
    end

    describe ".find_similar_or_initialize_by" do
    end

    describe ".delete_unauth_location?" do
    end

    describe ".normalize_location_and_delete?" do
    end

    describe ".grab_avatar_image" do
    end

  end
end