class DirectLink< ApplicationRecord
  validates :link_code, :opportunity_ids, :profile_id, presence: true
  validates :link_code, uniqueness: true

  after_initialize :ensure_link_code

  # belongs_to :opportunity,
  #   foreign_key: :opportunity_ids,
  #   class_name: :Opportunity

  belongs_to :profile,
    foreign_key: :profile_id,
    class_name: :User

  def opportunities
    Opportunity.where(id: self.opportunity_ids)
  end

  def ensure_link_code
    self.link_code ||= generate_link_code
  end

  def generate_link_code
    SecureRandom.urlsafe_base64
  end
end
