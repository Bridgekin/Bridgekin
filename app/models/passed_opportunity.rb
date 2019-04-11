class PassedOpportunity < ApplicationRecord
  validates :user_id, :opportunity_id, presence: true
  validates :user_id, uniqueness: { scope: :opportunity_id }

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :opportunity,
    foreign_key: :opportunity_id,
    class_name: :Opportunity

end
