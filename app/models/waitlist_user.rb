class WaitlistUser < ApplicationRecord
  validates :email, :fname, :lname, presence: true

end
