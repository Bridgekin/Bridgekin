export const fetchCurrentUserMetrics = user => (
  fetch(`${window.location.origin}/api/user_metrics`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
