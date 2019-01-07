export const fetchNetworks = () => (
  fetch('api/networks', {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchNetwork = id => (
  fetch(`api/networks/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createNetwork = opportunity => (
  fetch('api/networks', {
    method: 'POST',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateNetwork = opportunity => (
  fetch('api/networks', {
    method: 'PATCH',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteNetwork = id => (
  fetch(`api/networks/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
