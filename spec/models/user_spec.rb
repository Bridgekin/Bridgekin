require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "user" do
    subject { create(:user) }

    it { should validate_presence_of(:fname) }
    # it { should validate_presence_of(:lname) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    it { should have_one(:user_feature) }
    it { should have_many(:sales_user_networks) }
    it { should have_many(:sales_networks) }
    it { should have_many(:sales_user_contacts) }
    it { should have_many(:sales_contacts) }
    it { should have_many(:intro_requests_sent) }
    it { should have_many(:intro_requests_received) }
    it { should have_many(:payments) }
    # it { should have_many(:paid_subscriptions) }
    # it { should have_many(:owned_subscriptions) }
    it { should have_many(:sales_admin_networks) }
    it { should have_many(:managed_sales_networks) }
    it { should have_one(:stripe_details) }
    it { should have_many(:request_templates) }

    describe '.determine_end_date' do
      it "should return date" do
        time = DateTime.now.beginning_of_day + 17.hour
        expect(User.determine_end_date(1.week)).to eq(time + 1.week)
        expect(User.determine_end_date(1.month)).to eq(time + 1.month)
      end

      it "should retrun nil for any non-date input" do
        expect(User.determine_end_date("hi")).to be_nil
        expect(User.determine_end_date(1)).to be_nil
      end
    end

    describe '.save_to_network' do
      before(:each) do
        @new_user = build(:user)
        @sales_network = create(:sales_network, :with_subscription)
      end

      it 'should save to a network' do
        @new_user.save_to_network(@sales_network, "full")
        expect(@new_user.id).to be_truthy
      end

      it 'should save different types of users' do
        @new_user.save_to_network(@sales_network, "limited")
        sales_user_network = @new_user.sales_user_networks.where(network_id: @sales_network.id).first
        expect(sales_user_network.member_type).to eq("limited")
      end
      

      it 'should throw an error if given incorrect network values' do
        @new_user.save_to_network(1)
        expect(@new_user.id).to be_nil
        @new_user.save_to_network('places')
        expect(@new_user.id).to be_nil
      end
    end

    describe 'save_new_admin_network' do
      before(:each) do
        @new_user = build(:user)
        @sales_product = create(:sales_product)
        @sales_network = create(:sales_network, :with_subscription)

        @domain_params = { 
          title: Faker::Company.name,
          domain: Faker::Internet.domain_name
        }
        @purchase_params = {
          duration: "monthly",
          renewal: true,
          product_id: @sales_product.id,
          token_id: "123456"
        }
        # @address_params = {
        #   line1: Faker::Address.street_address,
        #   city: Faker::Address.city,
        #   state: Faker::Address.state,
        #   zipcode: Faker::Address.zip
        # }
      end

      # it 'saves all appropriate records' do
      #   @new_user.save_new_admin_network(@domain_params, @purchase_params)
      #   debugger
      #   expect(@new_user.id).to be_truthy
      #   # expect(@new_user.stripe_details).to be_trut
      # end

    end

    describe '.confirmed' do
      it "should be confirmed" do
        expect(subject.confirmed?).to be true
      end
    end

    describe 'Attachment' do
      it 'is valid  ' do
        subject.profile_pic.attach(io: File.open(Rails.root.join('client/src/static/castle.jpg')), filename: 'castle.jpg', content_type: 'image/jpg')
        expect(subject.profile_pic).to be_attached
      end
    end

    describe 'update_waitlist' do
      before do
        waitlist_user = create(:waitlist_user, email: subject.email)
      end

      it "should change wailist status to full" do
        subject.update_waitlist
        expect(WaitlistUser.find_by(email: subject.email).status).to eq 'Full'
      end
    end

    describe 'implement_trackable' do
      it "should instantiate and increment sign in metrics" do
        expect(subject.sign_in_count).to eq 0
        expect(subject.last_sign_in_at).to eq nil
        expect(subject.current_sign_in_at).to eq nil
        subject.implement_trackable
        expect(subject.sign_in_count).to eq 1
      end

      it "should set last sign to current sign in" do
        subject.implement_trackable
        expect(subject.sign_in_count).to eq 1
        @old_sign_in = subject.current_sign_in_at

        subject.implement_trackable
        expect(subject.sign_in_count).to eq 2
        expect(subject.last_sign_in_at).to eq @old_sign_in
      end
    end
  end
end
