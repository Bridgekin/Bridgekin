class WaitlistUser < ApplicationRecord
  # include EmailValidatable
  validates :fname, presence: true
  validates :email, format: { with: Devise.email_regexp, message: "is not a valid email" }
  validates :email, uniqueness: { case_sensitive: false, message: "They’re already a member of Bridgekin" }
end
