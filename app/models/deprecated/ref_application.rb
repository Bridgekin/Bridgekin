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

  def notify_parties
    self.notify_applicant
    self.notify_referrer
  end

  def get_applicant
    if self.candidate_id
      return self.candidate
    else
      return { fname: self.fname, 
        phone_number: self.phone_number }
    end
  end

  def get_referrer
    return nil if self.direct_referrer_id.nil? && self.referral_code.nil?

    if self.direct_referrer_id
      referrer = self.direct_referrer
    else
      referral_code = RefOppLink.find_by(link_code: self.referral_code)
      referrer = referral_code.owner
    end
    referrer
  end

  def notify_applicant
    applicant = self.get_applicant

    root_url = Rails.application.credentials.host_url
    ref_opp = self.ref_opp
    message = case self.status
    when 'open'
      if self.candidate_id
        code = applicant.ref_opp_links.new
        option = "Share your unique link with your contacts and have them follow the link to apply: #{root_url}hiring/show/#{self.ref_opp_id}?referralCode=#{code.link_code}"
      else
        option = "Signup for an account at: #{root_url}hiring."
      end

      "Hi #{applicant[:fname].capitalize},\n\nThanks for applying to the #{ref_opp.company.capitalize} position! We’re filling multiple roles for this position and you can get paid if you refer a friend. $#{ref_opp.interview_incentive}if the person you refer gets an in-person interview, $#{ref_opp.hire_incentive} once they get hired!\n\n" + option
    end

    unless applicant[:phone_number].nil? && applicant[:phone_number].empty?
      SendTwilioJob.perform_later(applicant[:phone_number], message)
    end
  end

  def notify_referrer
    referrer = self.get_referrer
    return nil if referrer.nil?

    applicant = self.get_applicant
    root_url = Rails.application.credentials.host_url
    message = case self.status
    when 'open'
      code = referrer.ref_opp_links.new
      "Hi #{referrer.fname.capitalize},\n\nReferral Money: Thanks for referring #{applicant[:fname].capitalize}! They just submitted an application for the #{self.ref_opp.title.capitalize} Position. We’ll keep you posted on their hiring status.\n\nHere is your referral link again in case you have others that would be a good fit: #{root_url}hiring/show/#{self.ref_opp_id}?referralCode=#{code.link_code}"
    when 'phone screen'
      "Hi #{referrer.fname.capitalize},\n\nReferral Money: #{applicant[:fname].capitalize} is scheduled for a phone screen! We’ll keep you posted on their hiring status."
    when 'interview'
      "Hi #{referrer.fname.capitalize},\n\nReferral Money: #{applicant[:fname].capitalize} just passed the phone screen and is coming in for an interview! Once interviewed you’ll get paid $#{self.ref_opp.interview_incentive}. We’ll keep you posted on their hiring status."
    when 'hired'
      code = referrer.ref_opp_links.new
      "Hi #{referrer.fname.capitalize},\n\nReferral Money: #{applicant[:fname].capitalize}’s been hired! You just earned $#{self.ref_opp.hire_incentive} which will be in your next paycheck. There are still positions to fill so keep getting paid by sharing your unique link with your contacts: #{root_url}hiring/show/#{self.ref_opp_id}?referralCode=#{code.link_code}"
    when 'passed'
      code = referrer.ref_opp_links.new
      "Hi #{referrer.fname.capitalize},\n\nReferral Money: We decided to not move forward with #{applicant[:fname].capitalize} but want to thank you for referring them. If you know anyone else who you think would be a good fit you can share you unique referral link: #{root_url}hiring/show/#{self.ref_opp_id}?referralCode=#{code.link_code}"
    end

    unless referrer.phone_number.nil? && referrer.phone_number.empty?
      SendTwilioJob.perform_later(referrer.phone_number, message)
    end
  end

  # def test_message()
  #   SendTwilioJob.perform_later("4436326422", "Test from model")
  # end
end
