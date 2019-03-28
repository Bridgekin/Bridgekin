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

// export const fetchConnectionTemplate = connectBool => (
//   fetch(`${window.location.origin}/api/connection_template?connectBool=${connectBool}`, {
//     method: 'GET',
//     headers:{
//     	'Content-Type': 'application/json',
//       "Authorization": localStorage.getItem('bridgekinToken')
//   	}
//   })
// )
