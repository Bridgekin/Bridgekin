require 'rails_helper'
require 'stripe_mock'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "user" do
    subject { create(:user) }

    it { should validate_presence_of(:fname) }
    # it { should validate_presence_of(:lname) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    it { should have_one(:user_feature) }
    it { should have_many(:sales_user_permissions) }
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
        expect(User.determine_end_date(1.week)).to be_a(DateTime)
      end

      it "should return the right date" do
        time = DateTime.now
        rounded = time.beginning_of_hour + 1.hour
        if rounded.hour > 17
          rounded = rounded.beginning_of_day + 1.day + 17.hour
        else
          diff = 17 - rounded.hour
          rounded += diff.hour
        end
        time = rounded
        expect(User.determine_end_date(1.week)).to eq(time + 1.week)
        expect(User.determine_end_date(1.month)).to eq(time + 1.month)
      end

      it "should retrun nil for any non-date input" do
        expect(User.determine_end_date("hi")).to be_nil
        expect(User.determine_end_date(1)).to be_nil
      end
    end

    describe '.save_from_invite' do
      before(:each) do
        @sender = build(:user)
        @new_user = build(:user)
        @sales_network = create(:sales_network, :with_subscription)
        @sales_invite = create(:sales_invite, sender: @sender, network: @sales_network)
      end

      it 'should save to a network' do
        @new_user.save_from_invite(@sales_invite)
        expect(@new_user.id).to be_truthy
      end

      it 'should save different types of users' do
        @sender = build(:user)
        @sales_invite = create(:sales_invite, sender: @sender, network: @sales_network, relationship: 'request')

        @new_user.save_from_invite(@sales_invite)
        sales_user_permission = @new_user.sales_user_permissions.find_by(permissable_id: @sales_network.id, permissable_type: 'SalesNetwork')
        expect(sales_user_permission.relationship).to eq("request")
      end
      

      it 'should throw an error if given incorrect network values' do
        @new_user.save_from_invite(1)
        expect(@new_user.id).to be_nil
        @new_user.save_from_invite('places')
        expect(@new_user.id).to be_nil
      end
    end

    describe 'save_new_admin_network' do
      before { StripeMock.start }
      after { StripeMock.stop }

      before(:each) do
        @new_user = build(:user)
        @sales_product = create(:sales_product)
        # @sales_network = build(:sales_network, :with_subscription)

        @domain_params = { 
          title: Faker::Company.name,
          domain: Faker::Internet.domain_name
        }
        token = Stripe::Token.create({
          card: {
            number: '4242424242424242',
            exp_month: 7,
            exp_year: 2020,
            cvc: '314' }
        })
        @purchase_params = {
          duration: "monthly",
          renewal: true,
          product_id: @sales_product.id,
          token_id: token["id"]
        }
        # @address_params = {
        #   line1: Faker::Address.street_address,
        #   city: Faker::Address.city,
        #   state: Faker::Address.state,
        #   zipcode: Faker::Address.zip
        # }
      end

      it 'saves all appropriate records' do
        @new_user.save_new_paying_user(@domain_params, @purchase_params, "network")
        
        expect(@new_user.id).to be_truthy
        sales_network = SalesNetwork.find_by(domain: @domain_params[:domain])
        expect(sales_network).to be_truthy
        stripe_detail = StripeDetail.find_by(user_id: @new_user.id)
        expect(stripe_detail).to be_truthy
        # expect(@new_user.stripe_details).to be_trut
      end

      it "fails if the domain params are incorrect" do
        @domain_params = @domain_params.merge({ title: '', domain: '' })
        @new_user.save_new_paying_user(@domain_params, @purchase_params, "network")

        expect(@new_user.id).to be_nil
        sales_network = SalesNetwork.find_by(domain: @domain_params[:domain])
        expect(sales_network).to be_nil
      end

      it "fails if the purchase params are incorrect" do
        @purchase_params = @purchase_params.merge({ product_id: 'a' })
        @new_user.save_new_paying_user(@domain_params, @purchase_params, "network")

        expect(@new_user.id).to be_nil
        sales_network = SalesNetwork.find_by(domain: @domain_params[:domain])
        expect(sales_network).to be_nil
      end

      it "fails if a valid token isn't passed" do
        @purchase_params = @purchase_params.merge({ token_id: '1234'})
        @new_user.save_new_paying_user(@domain_params, @purchase_params, "network")

        expect(@new_user.id).to be_nil
        sales_network = SalesNetwork.find_by(domain: @domain_params[:domain])
        expect(sales_network).to be_nil
      end
    end

    describe ".post_auth_setup" do
      before(:each) do
        @new_user = create(:user)
      end

      it "it returns valid answers for all return values" do
        user_feature, users = @new_user.post_auth_setup()
        expect(user_feature).to be_truthy
        expect(users.length).to eq(1)
      end
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
