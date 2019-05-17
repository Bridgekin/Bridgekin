class RefOppEvents < ApplicationRecord
  validates :ownable_id, :ownable_type, :event, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User,
    optional: true
end
