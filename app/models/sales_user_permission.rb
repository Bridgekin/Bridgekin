class SalesUserPermission < ApplicationRecord
  validates :permissable_id, :permissable_type, :user_id, presence: true
  validates :permissable_id, uniqueness: { scope: [:user_id, :permissable_type]}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  # Could be a network or a user
  belongs_to :permissable,
    polymorphic: true

  # has_one :network_invite,
  #   as: :inviteable

  has_one :sales_invite,
    foreign_key: :user_permission_id,
    class_name: :SalesInvite
end