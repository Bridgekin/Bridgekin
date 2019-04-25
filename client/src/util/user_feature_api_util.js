export const updateUserFeature = payload => (
  fetch(`${window.location.origin}/api/user_features/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ payload }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
