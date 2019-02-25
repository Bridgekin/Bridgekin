export const fetchMemberUsers = (networkId) => (
  fetch(`${window.location.origin}/api/member_users?networkId=${networkId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const addMemberUser = (networkId, userId) => (
  fetch(`${window.location.origin}/api/member_users?networkId=${networkId}`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const removeMemberUser = (networkId, userId) => (
  fetch(`${window.location.origin}/api/member_users?networkId=${networkId}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
