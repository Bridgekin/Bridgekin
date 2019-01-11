export const fetchOpportunities = (networkId) => (
  fetch(`${window.location.origin}/api/opportunities?networkId=${networkId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchUserOpportunities = (networkId) => (
  fetch(`${window.location.origin}/api/userOpportunities?networkId=${networkId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchOpportunity = id => (
  fetch(`${window.location.origin}/api/opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createOpportunity = opportunity => (
  fetch(`${window.location.origin}/api/opportunities`, {
    method: 'POST',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateOpportunity = opportunity => (
  fetch(`${window.location.origin}/api/opportunities/${opportunity.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteOpportunity = id => (
  fetch(`${window.location.origin}/api/opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
