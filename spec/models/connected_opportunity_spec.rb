require 'rails_helper'

RSpec.describe ConnectedOpportunity, type: :model do
  subject { ConnectedOpportunity.new(opportunity_id: 1, user_id: 1) }

  it { should validate_presence_of(:opportunity_id) }
  it { should validate_uniqueness_of(:user_id)
    .scoped_to(:opportunity_id)
    .allow_nil}

  it { should belong_to(:opportunity) }
  it { should belong_to(:user).optional  }
  it { should belong_to(:facilitator).optional }
  it { should belong_to(:network).optional  }
end
