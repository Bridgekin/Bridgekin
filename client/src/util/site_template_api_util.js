export const fetchSiteTemplate = (networkId) => (
  fetch(`${window.location.origin}/api/site_templates/${networkId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
