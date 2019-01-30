require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "user" do
    subject { User.new(confirmed_at: DateTime.now,
      email: '123@email.com', password: '12345678',
      password_confirmation: '12345678', fname:'sd', lname: 'sdf') }

    it { should validate_presence_of(:fname) }
    it { should validate_presence_of(:lname) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }

    it { should have_many(:opportunities) }
    it { should have_many(:connected_opportunities) }
    it { should have_many(:opportunity_connections) }
    it { should have_many(:finalized_opportunities) }
    it { should have_many(:saved_opportunities) }
    it { should have_many(:facilitated_opportunities) }
    it { should have_many(:opportunity_connections_facilitated) }
    it { should have_many(:facilitated_deals) }

    it { should have_many(:user_networks) }
    it { should have_many(:member_networks) }
    it { should have_many(:network_admins) }
    it { should have_many(:managed_networks) }
    it { should have_many(:referral_links) }
    it { should have_one(:recieved_referral) }
    it { should have_one(:notification_setting) }
    # it { should have_one_attached(:profile_pic) }

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

  end
end
