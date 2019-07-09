class StripeDetail < ApplicationRecord
  validates :user_id, :customer_id, presence: true

  scope :active, -> { where(status: "active") }

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
