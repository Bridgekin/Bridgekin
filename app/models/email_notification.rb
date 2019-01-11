class EmailNotification < ApplicationRecord
  validates :user_id, :notification_setting, presence: true
  validates :user_id, uniqueness: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
