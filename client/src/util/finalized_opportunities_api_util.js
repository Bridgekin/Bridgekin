export const fetchFinalizedOpportunities = () => (
  fetch(`${window.location.origin}/api/finalized_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchFinalizedOpportunity = id => (
  fetch(`${window.location.origin}/api/finalized_opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createFinalizedOpportunity = finalizedOpportunity => (
  fetch(`${window.location.origin}/api/finalized_opportunities`, {
    method: 'POST',
    body: JSON.stringify({ finalizedOpportunity }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteFinalizedOpportunity = id => (
  fetch(`${window.location.origin}/api/finalized_opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
