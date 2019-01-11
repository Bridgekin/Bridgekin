export const updateUser = user => (
  fetch(`${window.location.origin}/api/user`, {
    method: 'PATCH',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteUser = id => (
  fetch(`${window.location.origin}/api/user`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
