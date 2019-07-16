class EmailLog < ApplicationRecord
  validates :email_type, presence: true
end
