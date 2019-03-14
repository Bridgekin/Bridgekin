class Circle < ApplicationRecord
  validates :title, :owner_id, presence: true

  has_many :user_circles,
    foreign_key: :circle_id,
    class_name: :UserCircle

  has_many :members,
    through: :user_circles,
    source: :member

  has_one :owner,
    foreign_key: :owner_id,
    class_name: :User
end
