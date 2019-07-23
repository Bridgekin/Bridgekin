class ConnectSocialStat < ApplicationRecord
  validates :status, :uploader_id, presence: true

  belongs_to :user,
    foreign_key: :uploader_id,
    class_name: :User
end
