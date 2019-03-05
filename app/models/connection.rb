class Connection < ApplicationRecord
  validates :user_id, :friend_id, presence: true
  validates :user_id, uniqueness: { scope: :friend_id }

  belongs_to :requestor,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :friend_id,
    class_name: :User
end
