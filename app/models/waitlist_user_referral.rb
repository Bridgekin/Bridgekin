class WaitlistUserReferral < ApplicationRecord
  # include EmailValidatable
  validates :waitlist_user_id, :from_referral_id, presence: true
end
