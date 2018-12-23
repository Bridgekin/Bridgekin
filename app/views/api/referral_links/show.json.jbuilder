json.referral_link do
  json.extract! @link, :member_id, :network_id, :referral_code
end
