class FinalizedOpportunity < ApplicationRecord
  validates :opportunity_id, :user_id, presence: true
  validates :opportunity_id, uniqueness: true

  belongs_to :opportunity,
    foreign_key: :opportunity_id,
    class_name: :Opportunity

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User,
    optional: true

  belongs_to :facilitator,
    foreign_key: :facilitator_id,
    class_name: :User,
    optional: true

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :Network,
    optional: true
end
