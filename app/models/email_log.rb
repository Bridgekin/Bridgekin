class EmailLog < ApplicationRecord
  validates :recipient_id, :email_type, presence: true

end
