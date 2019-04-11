class WaitlistUser < ApplicationRecord
  # include EmailValidatable
  validates :fname, presence: true
  validates :email, format: { with: Devise.email_regexp, message: "is not a valid email" }
  validates :email, uniqueness: { case_sensitive: false, message: "has already signed up for the waitlist" }

  has_many :referrals,
    foreign_key: :waitlist_user_id,
    class_name: :WaitlistUserReferral

  def track_email
    self.email_sent_at = DateTime.now
    self.save
  end
end
