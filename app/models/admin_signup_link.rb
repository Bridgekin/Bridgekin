class AdminSignupLink< ApplicationRecord
  validates :code, presence: true
  validates :code, uniqueness: true

  after_initialize :ensure_referral_code

  belongs_to :product,
    foreign_key: :product_id,
    class_name: :SalesProduct

  def ensure_referral_code
    self.code ||= generate_referral_code
  end

  def generate_referral_code
    SecureRandom.urlsafe_base64
  end
end
