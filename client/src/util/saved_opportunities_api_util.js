export const fetchSavedOpportunities = () => (
  fetch('api/saved_opportunities', {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createSavedOpportunity = savedOpportunity => (
  fetch('api/saved_opportunities', {
    method: 'POST',
    body: JSON.stringify({ savedOpportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteSavedOpportunity = id => (
  fetch(`api/saved_opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
