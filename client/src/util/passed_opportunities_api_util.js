export const fetchPassedOpportunities = () => (
  fetch(`${window.location.origin}/api/passed_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createPassedOpportunity = (opportunityId) => (
  fetch(`${window.location.origin}/api/passed_opportunities?opportunityId=${opportunityId}`, {
    method: 'POST',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deletePassedOpportunity = (opportunityId) => (
  fetch(`${window.location.origin}/api/passed_opportunities?opportunityId=${opportunityId}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
