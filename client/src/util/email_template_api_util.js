export const fetchEmailTemplate = type => (
  fetch(`${window.location.origin}/api/email_templates?type=${type}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchWaitlistReferralTemplate = email => (
  fetch(`${window.location.origin}/api/email_templates?email=${email}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
