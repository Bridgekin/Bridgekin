require 'rails_helper'

RSpec.describe UserNetwork, type: :model do
  describe "user network" do
    subject { create(:user_network) }

    it { should validate_presence_of(:network_id) }
    it { should validate_presence_of(:member_id) }
    it { should validate_uniqueness_of(:network_id)
      .scoped_to(:member_id) }

    it { should belong_to(:member) }
    it { should belong_to(:network) }
  end
end
