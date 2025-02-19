export const fetchUserNetworks = () => (
  fetch(`${window.location.origin}/api/networks`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

// export const fetchWorkspaceNetworks = (workspaceId) => (
//   fetch(`${window.location.origin}/api/workspace_networks/${workspaceId}`, {
//     method: 'GET',
//     headers:{
//     	'Content-Type': 'application/json',
//       "Authorization": localStorage.getItem('bridgekinToken')
//   	}
//   })
// )

export const fetchWorkspaceOptions = (workspaceId) => (
  fetch(`${window.location.origin}/api/workspace_networks/${workspaceId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchNetwork = id => (
  fetch(`${window.location.origin}/api/networks/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createNetwork = network => (
  fetch(`${window.location.origin}/api/networks`, {
    method: 'POST',
    body: JSON.stringify({ network }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateNetwork = network => (
  fetch(`${window.location.origin}/api/networks`, {
    method: 'PATCH',
    body: JSON.stringify({ network }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteNetwork = id => (
  fetch(`${window.location.origin}/api/networks/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
