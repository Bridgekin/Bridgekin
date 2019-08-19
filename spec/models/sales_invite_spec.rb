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

    describe ".save_batch" do
      before(:each) do
        @user = create(:user)
        @user2 = create(:user)
        @sales_network = create(:sales_network)
        @prepped_invites = [
          {email: "asdfasdf", fname: "asdfasdfasdf",
          lname:"asdfasdfasdfasdf", relationship: "both", 
          network_id: @sales_network.id, 
          sender_id: @user.id} #,recipient_id: @user2.id }
        ]
      end
      
      it "should save a batch of invites" do
        results = SalesInvite.save_batch(@prepped_invites, @user)
        expect(results.first.id).to be_truthy
      end

      it "should return error message if there are no invites passed" do
        expect(SalesInvite.save_batch).to eq("Invites or user not provided")
      end

      it "should return error message if no user is passed" do
        expect(SalesInvite.save_batch(@prepped_invites)).to eq("Invites or user not provided")
      end

      it "should enqueue mailers for networks or users" do
        expect {
          SalesInvite.save_batch(@prepped_invites, @user)
        }.to have_enqueued_job.on_queue('mailers')
      end
    end

    describe ".confirm_invite" do
      before(:each) do
        @user = create(:user, :with_owned_sales_network)
        @sales_invite = create(:sales_invite, sender: @user)
      end

      it "confirm an invite, given a sales_invite" do
        expect{SalesInvite.confirm_invite(@sales_invite)}
      end

      it "should save if a user has user_permission" do
        @sales_invite2 = create(:sales_invite, :with_user_permission, sender: @user)
        expect{SalesInvite.confirm_invite(@sales_invite2)}
      end

      it "should raise error if sales_invite isn't found" do
        expect{SalesInvite.confirm_invite}.to raise_error
      end
    end

    describe ".update_invite" do
      before(:each) do
        @current_user = create(:user, :with_owned_sales_network)
        @sales_invite = create(:sales_invite, :with_user_permission, sender: @current_user)
      end

      it "update an invite relationship" do
        sales_invite = SalesInvite.update_invite(@sales_invite, "give", @current_user)
        user_permission = sales_invite.user_permission
        expect(sales_invite.relationship).to eq("give") 
      end

      it "should queue an email" do
        expect {
          SalesInvite.update_invite(@sales_invite, "give", @current_user)
        }.to have_enqueued_job.on_queue('mailers')
      end

      it "should raise error if sales_invite isn't found" do
        expect{SalesInvite.confirm_invite}.to raise_error
      end
    end

    describe ".confirm_invite_update" do
      before(:each) do
        @current_user = create(:user, :with_owned_sales_network)
        @sales_invite = create(:sales_invite, :with_user_permission, sender: @current_user, relationship: "request")
      end

      it "confirm invite update" do
        sales_invite = SalesInvite.confirm_invite_update(@sales_invite, "request")
        user_permission = sales_invite.user_permission
        expect(user_permission.relationship).to eq("request") 
        expect(user_permission.status).to eq("confirmed") 
      end

      it "should raise error if sales_invite isn't found" do
        expect{SalesInvite.confirm_invite_update}.to raise_error
      end
    end

  end
end