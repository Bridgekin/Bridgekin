export const fetchConnectedOpportunities = () => (
  fetch(`${window.location.origin}/api/connected_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchConnectedOpportunity = id => (
  fetch(`${window.location.origin}/api/connected_opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createConnectedOpportunity = connectedOpportunity => (
  fetch(`${window.location.origin}/api/connected_opportunities`, {
    method: 'POST',
    body: JSON.stringify({ connectedOpportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteConnectedOpportunity = id => (
  fetch(`${window.location.origin}/api/connected_opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
