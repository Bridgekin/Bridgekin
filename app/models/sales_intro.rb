class SalesIntro < ApplicationRecord
  validates :contact_id, :requestor_id, :recipient_id, presence: :true

  belongs_to :contact,
    foreign_key: :contact_id,
    class_name: :SalesContact

  belongs_to :requestor,
    foreign_key: :requestor_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User
end