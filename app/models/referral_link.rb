class ReferralLink< ApplicationRecord
  validates :member_id, :network_id, :referral_code, :status, :usage_type,
    presence: true
  validates :referral_code, uniqueness: true

  after_initialize :ensure_referral_code

  belongs_to :network,
    foreign_key: :network_id,
    class_name: :Network

  belongs_to :owner,
    foreign_key: :member_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User,
    optional: true

  def self.find_link_by_params(params)
    ReferralLink.where(
      member_id: params[:member_id],
      network_id: params[:network_id]
    ).first
  end

  def self.find_link_by_code(code)
    ReferralLink.where(referral_code: code).first
  end

  def ensure_referral_code
    self.referral_code ||= generate_referral_code
  end

  def generate_referral_code
    SecureRandom.urlsafe_base64
  end

end
