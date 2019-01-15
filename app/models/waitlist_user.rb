class WaitlistUser < ApplicationRecord
  # include EmailValidatable
  validates :email, :fname, :lname, presence: true
  validates :email, format: { with: Devise.email_regexp, message: "is not a valid email" }
  validates :email, uniqueness: { case_sensitive: false }
end
