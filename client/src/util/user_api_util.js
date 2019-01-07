export const signup = user => (
  fetch('api/signup', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)
