class WaitlistUser < ApplicationRecord
  validates :email, :fname, :lname, presence: true
  validates :email, uniqueness: true

end
