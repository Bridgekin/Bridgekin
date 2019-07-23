require 'rails_helper'

RSpec.describe NetworkAdmin, type: :model do
  subject { NetworkAdmin.new(network_id: 1, admin_id: 1) }

  it { should validate_presence_of(:network_id) }
  it { should validate_presence_of(:admin_id) }
  it { should validate_uniqueness_of(:network_id)
    .scoped_to(:admin_id)}

  it { should belong_to(:admin) }
  it { should belong_to(:network) }
end
