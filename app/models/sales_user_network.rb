class SalesUserNetwork < ApplicationRecord
  validates :network_id, :user_id, presence: true
  validates :network_id, uniqueness: { scope: :user_id }

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork
end