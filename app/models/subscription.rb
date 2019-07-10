class Subscription < ApplicationRecord
  validates :payer_id, :targetable_id, :targetable_type, :end_date, :product_id, presence: true

  scope :active, -> { where(status: "active") }

  belongs_to :payer,
    foreign_key: :payer_id,
    class_name: :User

  belongs_to :product,
    foreign_key: :product_id,
    class_name: :SalesProduct

  belongs_to :targetable, 
    polymorphic: true
end
