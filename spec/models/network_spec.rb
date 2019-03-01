require 'rails_helper'

RSpec.describe Network, type: :model do
  subject { Network.new(title: 'asdf') }

  it { should validate_presence_of(:title) }
  it { should validate_uniqueness_of(:title)}

  it { should have_many(:members) }
  it { should have_many(:network_admins) }
  it { should have_many(:admins) }
  # it { should have_many(:opportunity_networks) }
  it { should have_many(:opportunities) }
  it { should have_many(:referral_links) }
  it { should have_many(:connected_opportunities) }
  it { should have_many(:finalized_opportunities) }
end
