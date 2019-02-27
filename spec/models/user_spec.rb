require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  describe "user" do
    subject { create(:user) }

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

    describe 'decrement_invite_count' do
      it "should lower invites by 1" do
        beforeInvites = subject.invites_remaining
        subject.decrement_invite_count
        afterInvites = beforeInvites - 1
        expect(subject.invites_remaining).to eq afterInvites
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

    describe "get_template" do
      it "should "
    end

  end
end
