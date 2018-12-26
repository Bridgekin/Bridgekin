export const joinWaitlist = user => (
  fetch('api/waitlist_user', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)
