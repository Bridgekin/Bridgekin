export const joinWaitlist = user => (
  fetch('api/waitlist_user', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  }).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  })
  .catch(console.error)
)
