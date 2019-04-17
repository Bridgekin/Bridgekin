class CircleConnection < ApplicationRecord
  validates :circle_id, :connection_id, presence: true

  belongs_to :connection,
    foreign_key: :connection_id,
    class_name: :Connection

  belongs_to :circle,
    foreign_key: :circle_id,
    class_name: :Circle

end
