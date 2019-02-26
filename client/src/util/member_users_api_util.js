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
  fetch(`${window.location.origin}/api/member_users/${userId}?networkId=${networkId}`, {
    method: 'POST',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const addUserByReferral = (referralCode, userId) => (
  fetch(`${window.location.origin}/api/member_users/${userId}/referral/${referralCode}`, {
    method: 'POST',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const removeMemberUser = (networkId, userId) => (
  fetch(`${window.location.origin}/api/member_users/${userId}?networkId=${networkId}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
