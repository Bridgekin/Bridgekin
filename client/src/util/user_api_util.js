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
  fetch(`${window.location.origin}/api/users`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
