export const fetchCircles = () => (
  fetch(`${window.location.origin}/api/circles`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchCircle = id => (
  fetch(`${window.location.origin}/api/circles/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createCircle = circle => (
  fetch(`${window.location.origin}/api/circles`, {
    method: 'POST',
    body: JSON.stringify({ circle }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateCircle = circle => (
  fetch(`${window.location.origin}/api/circles/${circle.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ circle }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteCircle = id => (
  fetch(`${window.location.origin}/api/circles/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const addMember = (circleId, memberId) => (
  fetch(`${window.location.origin}/api/circles/${circleId}/add_member/${memberId}`, {
    method: 'POST',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const removeMember = (circleId, memberId) => (
  fetch(`${window.location.origin}/api/circles/${circleId}/remove_member/${memberId}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
