class UserNetwork < ApplicationRecord
  validates :network_id, :member_id, presence: true
  validates :network_id, uniqueness: { scope: :member_id }

  belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :Network

end
