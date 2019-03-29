export const fetchSavedOpportunities = () => (
  fetch(`${window.location.origin}/api/saved_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createSavedOpportunity = opportunityId => (
  fetch(`${window.location.origin}/api/saved_opportunities`, {
    method: 'POST',
    body: JSON.stringify({ opportunityId }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteSavedOpportunity = id => (
  fetch(`${window.location.origin}/api/saved_opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
