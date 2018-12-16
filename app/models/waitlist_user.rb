class WaitlistUser < ApplicationRecord
  validates :email, :name, presence: true

end
