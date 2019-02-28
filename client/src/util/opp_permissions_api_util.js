export const fetchOppPermissions = (opportunityId) => (
  fetch(`${window.location.origin}/api/opp_permissions?opportunityId=${opportunityId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchShareOptions = (opportunityId) => (
  fetch(`${window.location.origin}/api/opp_permissions/share_options`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
