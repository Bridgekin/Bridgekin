require 'rails_helper'

RSpec.describe ReferralLink, type: :model do
  describe "referral link" do
    subject { create(:referral_link) }

    it { should validate_presence_of(:network_id) }
    it { should validate_presence_of(:member_id) }
    it { should validate_presence_of(:referral_code) }
    it { should validate_presence_of(:status) }
    it { should validate_presence_of(:usage_type) }

    it { should validate_uniqueness_of(:referral_code)}

    it { should belong_to(:network) }
    it { should belong_to(:owner) }
    it { should belong_to(:recipient).optional }

    describe "#find_link_by_params" do
      it "should find link" do
        expect(ReferralLink.find_link_by_params({
          member_id: subject.member_id,
          network_id: subject.network_id
          })).to be_truthy
      end
    end

    describe "#find_link_by_code" do
      it "should find link" do
        expect(ReferralLink.find_link_by_code(
          subject.referral_code
          )).to be_truthy
      end
    end
    #
    # it "should ensure referral code exists" do
    #   expect(subject.ref)
    # end
  end
end
