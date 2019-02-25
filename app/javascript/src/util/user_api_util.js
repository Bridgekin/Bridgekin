export const updateUser = user => (
  fetch(`${window.location.origin}/api/users/${user.get('user[id]')}`, {
    method: 'PATCH',
    body: user,
    headers:{
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteUser = id => (
  fetch(`${window.location.origin}/api/users/id`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const resetPassword = email => (
  fetch(`${window.location.origin}/api/password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers:{
    	'Content-Type': 'application/json',
  	}
  })
)

export const passwordUpdate = payload => (
  fetch(`${window.location.origin}/api/password`, {
    method: 'PATCH',
    body: JSON.stringify({ payload }),
    headers:{
    	'Content-Type': 'application/json',
  	}
  })
)
