export const fetchConnections = () => (
  fetch(`${window.location.origin}/api/connections`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchConnection = (id) => (
  fetch(`${window.location.origin}/api/connections/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createConnection = (connection) => (
  fetch(`${window.location.origin}/api/connections`, {
    method: 'POST',
    body: JSON.stringify({ connection }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateConnection = (connection) => (
  fetch(`${window.location.origin}/api/connections/${connection.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ connection }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteConnection = (id) => (
  fetch(`${window.location.origin}/api/connections/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
