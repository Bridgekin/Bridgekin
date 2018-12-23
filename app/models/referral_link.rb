class ReferralLink< ApplicationRecord
  validates :member_id, :network_id, :referral_code, presence: true
  validates :referral_code, uniqueness: true

  after_initialize :ensure_referral_code

  def self.find_link_by_params(params)
    ReferralLink.where(
      member_id: params[:member_id],
      network_id: params[:network_id]
    ).first
  end

  def ensure_referral_code
    self.referral_code ||= generate_referral_code
  end

  def generate_referral_code
    SecureRandom.urlsafe_base64
  end

end
