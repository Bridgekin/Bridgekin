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
  
  has_one_attached :resume

  def referral_link
    RefOppLink.find_by(link_code: self.referral_code) if self.referral_code || nil
  end

  def notify_applicant()
    case self.status
    when 'open'
    when 'phone screen'
    when 'interview'
    when 'hire'
    when 'passed'
    end
  end

  def notify_referrer()
    case self.status
    when 'open'
    when 'phone screen'
    when 'interview'
    when 'hire'
    when 'passed'
    end
  end
end
