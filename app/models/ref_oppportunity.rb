class RefOpportunity < ApplicationRecord
  validates :owner_id, :title, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User
end
