export const createRefLink = id => (
  fetch(`${window.location.origin}/api/ref_opp_link?id=${id}`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
