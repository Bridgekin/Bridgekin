class UserCircles < ApplicationRecord
  validates :circle_id, :member_id, presence: true

  belongs_to :member,
    foreign_key: :member_id,
    class_name: :User

  belongs_to :circle,
    foreign_key: :circle_id,
    class_name: :Circle

end
