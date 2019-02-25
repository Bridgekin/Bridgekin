export const joinWaitlist = user => (
  fetch(`${window.location.origin}/api/waitlist_user`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)
