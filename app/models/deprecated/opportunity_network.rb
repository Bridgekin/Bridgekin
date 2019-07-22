class OpportunityNetwork < ApplicationRecord
  validates :network_id, :opportunity_id, presence: true
  validates :network_id, uniqueness: { scope: :opportunity_id }

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :Network

  belongs_to :opportunity,
    foreign_key: :opportunity_id,
    class_name: :Opportunity

end
