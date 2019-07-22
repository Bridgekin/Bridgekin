class WaitlistUserReferral < ApplicationRecord
  validates :waitlist_user_id, :from_referral_id, presence: true

  belongs_to :waitlist_user,
    foreign_key: :waitlist_user_id,
    class_name: :WaitlistUser
end
