class Subscription < ApplicationRecord
  validates :payer_id, :targetable_id, :targetable_type, 
  :amount, :seats, :end_date, presence: true

  scope :active, -> { where(status: "active") }

  belongs_to :payer,
    foreign_key: :payer_id,
    class_name: :User

  belongs_to :targetable, 
    polymorphic: true
end
