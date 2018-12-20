export const signup = user => (
  fetch('api/users', {
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

export const login = user => (
  fetch('api/session', {
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

export const logout = () => (
  fetch('api/session', {
    method: 'DELETE'
  }).then(res => {
    if(res.ok) {
      return res.json();
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  })
  .catch(console.error)
)
