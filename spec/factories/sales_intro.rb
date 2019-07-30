FactoryBot.define do
  factory :sales_intro do
    # contact
    # requestor
    # recipient

    message { "Blah" }
    explaination { "Blah" }
    referral_bonus { 0 }
    referral_unit { "$" }
    intro_subject { "Blah" }
    intro_body { "Blah" }
  end
end
