export const signup = user => (
  fetch('api/users', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  }).then(res => res.json())
)

export const login = user => (
  fetch('api/session', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  }).then(res => res.json()).catch(error => console.error(error))
)

export const logout = () => (
  fetch('api/session', {
    method: 'DELETE'
  }).then(res => res.json())
)
