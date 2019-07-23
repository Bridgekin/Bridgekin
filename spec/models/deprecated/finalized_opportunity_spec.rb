require 'rails_helper'

RSpec.describe FinalizedOpportunity, type: :model do
  subject { FinalizedOpportunity.new(opportunity_id: 1, user_id: 1) }

  it { should validate_presence_of(:opportunity_id) }
  it { should validate_presence_of(:user_id) }
  it { should validate_uniqueness_of(:opportunity_id)}

  it { should belong_to(:opportunity) }
  it { should belong_to(:user).optional  }
  it { should belong_to(:facilitator).optional }
  it { should belong_to(:network).optional  }
end
