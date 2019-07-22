export const fetchManagedNetworks = () => (
  fetch(`${window.location.origin}/api/network_admins`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
