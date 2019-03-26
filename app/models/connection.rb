class Connection < ApplicationRecord
  validates :user_id, :friend_id, presence: true
  validates :user_id, uniqueness: { scope: :friend_id }

  belongs_to :requestor,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :friend_id,
    class_name: :User

  has_many :opp_permissions, as: :shareable

  has_many :opportunities,
    through: :opp_permissions,
    source: :opportunity

  has_many :notifications, as: :acted_with
  has_many :notifications, as: :targetable

  has_many :notifications,
    as: :origin,
    dependent: :destroy
end
