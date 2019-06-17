class SalesNetwork < ApplicationRecord
  validates :title, :domain, presence: :true

  has_many :user_networks,
    foreign_key: :network_id,
    class_name: :SalesUserNetwork

  has_many :members,
    through: :user_networks,
    source: :user
end