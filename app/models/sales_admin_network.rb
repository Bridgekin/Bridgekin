class SalesAdminNetwork < ApplicationRecord
  validates :network_id, :admin_id, presence: true
  validates :network_id, uniqueness: { scope: :admin_id }

  belongs_to :admin,
    foreign_key: :admin_id,
    class_name: :User

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :SalesNetwork
end