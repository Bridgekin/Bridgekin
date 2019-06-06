class RefOppLink < ApplicationRecord
  validates :link_code, :ref_opp_id, presence: true
  validates :link_code, uniqueness: true

  after_initialize :ensure_link_code

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end

end
