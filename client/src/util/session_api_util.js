export const refSignup = (user, code) => (
  fetch('api/signup', {
    method: 'POST',
    body: JSON.stringify({ user, code }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const login = user => (
  fetch('api/login', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const logout = () => (
  fetch('api/logout', {
    method: 'DELETE'
  })
)

export const getAuthUserId = (token) => (
  fetch('api/authorization', {
    headers: {
        "Authorization":token
    },
    method: 'GET'
  })
)
