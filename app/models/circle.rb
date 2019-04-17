class Circle < ApplicationRecord
  validates :title, :owner_id, presence: true

  has_many :circle_connections,
    foreign_key: :circle_id,
    class_name: :CircleConnection,
    dependent: :destroy

  has_many :connections,
    through: :circle_connections,
    source: :connection

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  def fill_with_connections(connection_ids)
    templates = connection_ids.map do |connection_id|
      {circle_id: self.id, connection_id: connection_id}
    end
    CircleConnection.create(templates)
  end
end
