require 'rails_helper'

RSpec.describe SalesContact, type: :model do
  describe "sales_contact" do
    describe ".search_contacts" do
      before(:all) do
        @member_count = 5
        @contact_count = 20
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count)
        @user = @sales_network.members.first
      end

      it "should return all members with no search" do
        result = SalesContact.search_contacts(@user,
        {permissable_id: @sales_network.id, permissable_type: 'SalesNetwork'})
        expect(result.count).to eq(@member_count * @contact_count)
      end

      it "should return nil if it isn't passed a current _user or network" do
        result = SalesContact.search_contacts()
        expect(result).to be_nil
      end

      it "should respond with owned contacts if no network" do
        sales_network = create(:sales_network, 
        :with_subscription)
        contact_count = 20
        user = create(:user, :with_sales_contacts, contact_count: contact_count)
        
        result = SalesContact.search_contacts(user,
        {permissable_id: sales_network.id, permissable_type: 'SalesNetwork'})
        expect(result.count).to eq(20)
      end
    
    end

    describe ".determine_relationship" do
    end

    describe ".filter_sales_contacts" do
      before(:all) do
        @member_count = 5
        @contact_count = 20
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count)
        @user = @sales_network.members.first
        @sales_contacts = @sales_network.member_contacts
      end

      it "should filter to show my contacts" do
        result = SalesContact.filter_sales_contacts(@sales_contacts, @user, "mine")
        expect(result.count).to eq(@user.sales_contacts.count)
      end

      it "should filter to show my team's contacts" do
        result = SalesContact.filter_sales_contacts(@sales_contacts, @user, "teammates")
        expect(result.count).to eq((@member_count - 1) * @contact_count)
      end

      it "should filter for only google" do
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count, google: true)
        @user = @sales_network.members.first
        @sales_contacts = @sales_network.member_contacts

        result = SalesContact.filter_sales_contacts(@sales_contacts, @user, "google")
        expect(result.count).to eq(100)
      end

      it "should filter for only linked_in" do
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count, linked_in: true)
        @user = @sales_network.members.first
        @sales_contacts = @sales_network.member_contacts

        result = SalesContact.filter_sales_contacts(@sales_contacts, @user, "linkedIn")
        expect(result.count).to eq(100)
      end
    end
      
    describe "filter_by_search_input" do
      before(:all) do
        @member_count = 5
        @contact_count = 20
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count)
        @user = @sales_network.members.first
      end

      it "should search by fname" do
        contact = @user.sales_contacts.first
        social_params = { fname: contact.fname }
        target_params = {permissable_id: @sales_network.id, permissable_type: 'SalesNetwork'}
        result = SalesContact.search_contacts(@user, target_params, social_params)
        expect(result.include?(contact)).to be_truthy
      end

      it "should search by lname" do
        contact = @user.sales_contacts.first
        social_params = { lname: contact.lname }
        target_params = {permissable_id: @sales_network.id, permissable_type: 'SalesNetwork'}
        result = SalesContact.search_contacts(@user, target_params, social_params)
        expect(result.include?(contact)).to be_truthy
      end
    end

    describe ".prep_search_data" do
      before(:all) do
        @member_count = 5
        @contact_count = 20
        @sales_network = create(:sales_network, 
        :with_subscription, :with_connected_members, member_count: @member_count, contact_count: @contact_count)
        @user = @sales_network.members.first
        @sales_contacts = @sales_network.member_contacts
        @limit = 15
      end

      it "returns the correct total" do
        sales_contacts, total, friend_map, friend_users = SalesContact.prep_search_data(@sales_contacts, @user,0, @limit)
        expect(total).to eq(@sales_contacts.count)
      end

      it "returns only limited amount of records" do
        limit = 15
        sales_contacts, total, friend_map, friend_users = SalesContact.prep_search_data(@sales_contacts, @user,0, @limit)
        expect(sales_contacts.length).to eq(limit)
      end

      it "returns friend map with key count equaling limit" do
        limit = 10
        sales_contacts, total, friend_map, friend_users = SalesContact.prep_search_data(@sales_contacts, @user,0, limit)
        expect(friend_map.keys.length).to eq(10)

        limit = 20
        sales_contacts, total, friend_map, friend_users = SalesContact.prep_search_data(@sales_contacts, @user,0, limit)
        expect(friend_map.keys.length).to eq(20)
      end

      it "returns data without offset or limit defined" do
        sales_contacts, total, friend_map, friend_users = SalesContact.prep_search_data(@sales_contacts, @user)
        expect(sales_contacts.length).to eq(10)
        expect(total).to be_truthy
      end
    end

    describe ".find_similar_or_initialize_by" do
      before(:all) do
        @google_contact = create(:google_contact)
        @linked_in_contact = create(:linked_in_contact)
        @company = @linked_in_contact.company
        @domain = @company.downcase + ".com"

        @sales_company = create(:sales_company, title: @company, domain: @domain)
      end

      context "testing the google side" do
        it "should return the same value if it exists" do
          payload = {
            fname: @google_contact.fname,
            lname: @google_contact.lname,
            email: @google_contact.email
          }
          result = SalesContact.find_similar_or_initialize_by("google", payload)
          expect(result.id).to eq(@google_contact.id)
        end

        it "should return a new value another doesn't exist" do
          payload = {
            fname: @google_contact.fname + "1",
            lname: @google_contact.lname + "1",
            email: @google_contact.email + "1"
          }
          result = SalesContact.find_similar_or_initialize_by("google", payload)
          expect(result).to be_truthy
          expect(result.id).to be_nil
        end

        it "should return find similar value on linked_in side" do
          payload = {
            fname: @linked_in_contact.fname,
            lname: @linked_in_contact.lname,
            email: "tester@#{@domain}"
          }
          result = SalesContact.find_similar_or_initialize_by("google", payload)
          expect(result.id).to eq(@linked_in_contact.id)
        end

        it "should return a new value if the domain isn't the same" do
          payload = {
            fname: @linked_in_contact.fname,
            lname: @linked_in_contact.lname,
            email: "tester@1d4wge.org"
          }
          result = SalesContact.find_similar_or_initialize_by("google", payload)
          expect(result).to be_truthy
          expect(result.id).to be_nil
        end
      end


      context "testing the linkedIn side" do
        it "should return the same value if it exists" do
          payload = {
            fname: @linked_in_contact.fname,
            lname: @linked_in_contact.lname,
            company: @linked_in_contact.company,
            position: @linked_in_contact.position
          }
          result = SalesContact.find_similar_or_initialize_by("linked_in", payload)
          expect(result.id).to eq(@linked_in_contact.id)
        end

        it "should return a new value another doesn't exist" do
          payload = {
            fname: @linked_in_contact.fname,
            lname: @linked_in_contact.lname,
            company: @linked_in_contact.company + "1",
            position: @linked_in_contact.position + "1"
          }
          result = SalesContact.find_similar_or_initialize_by("linked_in", payload)
          expect(result).to be_truthy
          expect(result.id).to be_nil
        end

        it "should return find similar value on linked_in side" do
          domain = @google_contact.email.split("@").last
          sales_company2 = create(:sales_company, domain: domain)
          
          payload = {
            fname: @google_contact.fname,
            lname: @google_contact.lname,
            company: sales_company2.title,
            position: "test"
          }
          
          result = SalesContact.find_similar_or_initialize_by("linked_in", payload)
          expect(result.id).to eq(@google_contact.id)
        end

        it "should return a new value if the domain isn't the same" do
          payload = {
            fname: @google_contact.fname,
            lname: @google_contact.lname,
            company: "Awesome",
            position: "Leader"
          }
          result = SalesContact.find_similar_or_initialize_by("linked_in", payload)
          expect(result).to be_truthy
          expect(result.id).to be_nil
        end
      end
    end

    describe ".delete_unauth_location?" do
    end

    describe ".normalize_location_and_delete?" do
    end

    describe ".grab_avatar_image" do
    end
  end
end