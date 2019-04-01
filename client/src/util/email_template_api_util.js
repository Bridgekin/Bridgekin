export const fetchEmailTemplate = template_type => (
  fetch(`${window.location.origin}/api/email_templates?template_type=${template_type}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchWaitlistReferralTemplate = email => (
  fetch(`${window.location.origin}/api/waitlist_referral_template?email=${email}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchConnectedOpportunityTemplate = (connect_bool, opp_id) => (
  fetch(`${window.location.origin}/api/connected_opportunity_template?connect_bool=${connect_bool}&opp_id=${opp_id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
