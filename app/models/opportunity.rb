class Opportunity < ApplicationRecord
  validates :owner_id, :title, :opportunity_need, :industries,
    :geography, :value, :status, presence: true

  validates :title, uniqueness: {
    scope: :owner_id,
    message: "is already taken across your authored opportunities" }

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :opportunity_networks,
    foreign_key: :opportunity_id,
    class_name: :OpportunityNetwork,
    dependent: :destroy

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

  has_one_attached :picture

  # serialize       :industries, Array
  # attr_accessor   :industries_raw

  def industries_raw
    self.industries.join(",") unless self.industries.nil?
  end

  def industries_raw=(values)
    self.industries = []
    self.industries=values.split(",")
  end

  def geography_raw
    self.geography.join(",") unless self.geography.nil?
  end
end
