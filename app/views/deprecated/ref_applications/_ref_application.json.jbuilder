json.extract! ref_application, :id, :fname, :lname,
:email, :referral_code, :ref_opp_id, :direct_referrer_id,
:candidate_id, :question_1, :answer_1, :status

json.resumeUrl ref_application.resume.service_url if ref_application.resume.attached?