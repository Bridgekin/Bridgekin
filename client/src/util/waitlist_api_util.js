export const joinWaitlist = user => (
  fetch(`${window.location.origin}/api/waitlist_user`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const registerWaitlistFromReferral = user => (
  fetch(`${window.location.origin}/api/waitlist_user/create_with_referral`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)
