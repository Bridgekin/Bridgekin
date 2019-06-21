class SalesUserContact < ApplicationRecord
  validates :contact_id, :user_id, presence: true
  validates :user_id, uniqueness: { scope: :contact_id }

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :contact,
    foreign_key: :contact_id,
    class_name: :SalesContact
end