class StripePayment < ApplicationRecord
  validates :transaction_id, :user_id, :network_id,
  :sub_id, :amount, :duration, presence: true
  validates :transaction_id, uniqueness: true

  belongs_to :customer,
    foreign_key: :user_id,
    class_name: :User
  
  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork

  belongs_to :subscription,
    foreign_key: :sub_id,
    class_name: :Subscription
end
