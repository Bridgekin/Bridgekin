class SavedOpportunity < ApplicationRecord
  validates :opportunity_id, :user_id, presence: true
  validates :opportunity_id, uniqueness: { scope: :user_id }

  belongs_to :opportunity,
    foreign_key: :opportunity_id,
    class_name: :Opportunity

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
