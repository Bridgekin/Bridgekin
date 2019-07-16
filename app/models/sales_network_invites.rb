class SalesNetworkInvite < ApplicationRecord
  validates :network_id, :sender_id, presence: :true

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork

  belongs_to :sender,
    foreign_key: :sender_id,
    class_name: :User
end