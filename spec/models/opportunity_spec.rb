require 'rails_helper'

RSpec.describe Opportunity, type: :model do

  subject { Opportunity.new(owner_id: 1, title: 'asdf',
    opportunity_need: 'asd', industries: [], geography: [],
    value: 'asd', status: 'asd' ) }

  it { should validate_presence_of(:owner_id) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:opportunity_need) }
  it { should validate_presence_of(:industries) }
  it { should validate_presence_of(:geography) }
  it { should validate_presence_of(:value) }
  it { should validate_presence_of(:status) }
  it { should validate_uniqueness_of(:title)
    .scoped_to(:owner_id)
    .with_message("is already taken across your authored opportunities")}

  it { should belong_to(:owner) }
  it { should have_many(:opportunity_networks) }
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

  describe 'Reset Networks function' do
    before do
      @network = Network.create(title: 'a')
      @network_2 = Network.create(title: 'b')
      OpportunityNetwork.create(network_id: @network.id,
        opportunity_id: subject.id )
    end

    context 'when passed a string representing an array of networks' do
      it 'should update with new network connections' do
        subject.reset_networks('#{@network.id},#{@network_2.id}')
        expect(subject.networks).to eq([@network, @network_2])
        expect(subject.networks).not_to eq([@network])
      end
    end
  end
end
