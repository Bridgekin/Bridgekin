export const refSignup = (user, code) => (
  fetch(`${window.location.origin}/api/signup`, {
    method: 'POST',
    body: JSON.stringify({ user, code }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const hireSignup = (user) => (
  fetch(`${window.location.origin}/api/hire_signup`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
)

export const salesSignup = (user) => (
  fetch(`${window.location.origin}/api/sales_signup`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
)

export const adminSignup = (user) => (
  fetch(`${window.location.origin}/api/admin_signup`, {
    method: 'POST',
    body: JSON.stringify( user ),
    headers: {
      'Content-Type': 'application/json'
    }
  })
)

export const salesInviteSignup = (user) => (
  fetch(`${window.location.origin}/api/sales_invite_signup`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
)

export const googleSalesLogin = (user) => (
  fetch(`${window.location.origin}/api/google_sales_signup`, {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers: {
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
      "Authorization": token
    },
    method: 'GET'
  })
)

export const getPublicEnv = () => (
  fetch(`${window.location.origin}/api/public_env_variables`, {
    method: 'GET'
  })
)
