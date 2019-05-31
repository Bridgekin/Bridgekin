class RefApplication < ApplicationRecord

  belongs_to :ref_opp,
    foreign_key: :ref_opp_id,
    class_name: :RefOpportunity,
    optional: true

  belongs_to :direct_referrer,
    foreign_key: :direct_referrer_id,
    class_name: :User,
    optional: true

  belongs_to :candidate,
    foreign_key: :candidate_id,
    class_name: :User,
    optional: true

  def referral_link
    RefOppLink.find_by(link_code: self.referral_code) if self.referral_code || nil
  end
end
