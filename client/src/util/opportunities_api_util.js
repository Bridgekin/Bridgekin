export const fetchOpportunities = () => (
  fetch('api/opportunities', {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchOpportunity = id => (
  fetch(`api/opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createOpportunity = opportunity => (
  fetch('api/opportunities', {
    method: 'POST',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateOpportunity = opportunity => (
  fetch('api/opportunities', {
    method: 'PATCH',
    body: JSON.stringify({ opportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteOpportunity = id => (
  fetch(`api/opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
