export const createReferral = referral => (
  fetch('api/referral_links', {
    method: 'POST',
    body: JSON.stringify({ referral }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
