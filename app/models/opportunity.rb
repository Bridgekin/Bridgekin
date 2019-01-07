class Opportunity < ApplicationRecord
  validates :owner_id, :title, :opportunity_needs, :industries,
    :geography, :value, :status, presence: true

  validates :owner_id, uniqueness: { scope: :title }

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :opportunity_networks,
    foreign_key: :opportunity_id,
    class_name: :OpportunityNetwork

  has_many :networks,
    through: :opportunity_networks,
    source: :network

  has_many :connected_opportunities,
    foreign_key: :opportunity_id,
    class_name: :ConnectedOpportunity

  has_many :finalized_opportunities,
    foreign_key: :opportunity_id,
    class_name: :FinalizedOpportunity

  has_many :saved_opportunities,
    foreign_key: :opportunity_id,
    class_name: :SavedOpportunity
end
