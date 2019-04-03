export const createDirectLink = opportunity_ids => (
  fetch(`${window.location.origin}/api/direct_links`, {
    method: 'POST',
    body: JSON.stringify({ opportunity_ids }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchDirectLink = link_code => (
  fetch(`${window.location.origin}/api/direct_links?link_code=${link_code}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
