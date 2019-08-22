// export const addExternalUser = user => (
//   fetch(`${window.location.origin}/api/add_external_user`, {
//     method: 'POST',
//     body: JSON.stringify({ user }),
//     headers:{
//     	'Content-Type': 'application/json',
//       "Authorization": localStorage.getItem('bridgekinToken')
//   	}
//   })
// )

export const fetchSearchResults = searchInput => (
  fetch(`${window.location.origin}/api/search_bar?searchInput=${searchInput}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchUser = userId => (
  fetch(`${window.location.origin}/api/users/${userId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

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
