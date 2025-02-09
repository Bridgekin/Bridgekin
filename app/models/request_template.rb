class RequestTemplate < ApplicationRecord
  validates :user_id, :subject, :body, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end