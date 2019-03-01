require 'rails_helper'

RSpec.describe Opportunity, type: :model do

  subject { create(:opportunity, :with_networks) }

  it { should validate_presence_of(:owner_id) }
  # it { should validate_presence_of(:title) }
  # it { should validate_presence_of(:opportunity_need) }
  # it { should validate_presence_of(:industries) }
  # it { should validate_presence_of(:geography) }
  # it { should validate_presence_of(:value) }
  it { should validate_presence_of(:status) }
  it { should validate_uniqueness_of(:title)
    .scoped_to(:owner_id)
    .with_message("is already taken across your authored opportunities")
    .allow_blank}

  it { should belong_to(:owner) }
  # it { should have_many(:opportunity_networks) }
  it { should have_many(:networks) }
  it { should have_many(:connected_opportunities) }
  it { should have_many(:finalized_opportunities) }
  it { should have_many(:saved_opportunities) }

  describe 'Picture' do
    it 'is valid  ' do
      subject.picture.attach(io: File.open(Rails.root.join('client/src/static/castle.jpg')), filename: 'castle.jpg', content_type: 'image/jpg')
      expect(subject.picture).to be_attached
    end
  end

  describe 'Reset sharing function' do
    before do
      @prev_networks = subject.networks
      @new_networks = create_list(:network, 3)
      @new_network_ids = @new_networks.map{|network| '#{network.id}' }
    end

    context 'when passed a string representing an array of networks' do
      it 'should update with new network connections' do
        subject.reset_sharing(@new_network_ids, [], [])
        expect(subject.networks).to eq(@new_networks)
        expect(subject.networks).not_to eq(@prev_networks)
      end
    end
  end
end
