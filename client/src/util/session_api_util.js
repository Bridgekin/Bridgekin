export const refSignup = (user, code) => (
  fetch(`${window.location.origin}/api/signup`, {
    method: 'POST',
    body: JSON.stringify({ user, code }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const hireSignup = (user, code) => (
  fetch(`${window.location.origin}/api/hire_signup`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const login = user => (
  fetch(`${window.location.origin}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const logout = () => (
  fetch(`${window.location.origin}/api/logout`, {
    method: 'DELETE'
  })
)

export const getAuthUserId = (token) => (
  fetch(`${window.location.origin}/api/authorization`, {
    headers: {
        "Authorization":token
    },
    method: 'GET'
  })
)
