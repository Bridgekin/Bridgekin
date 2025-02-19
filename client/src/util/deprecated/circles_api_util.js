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

export const addMember = (circleId, connectionId) => (
  fetch(`${window.location.origin}/api/circles/${circleId}/add_member/${connectionId}`, {
    method: 'POST',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const removeMember = (circleConnectionId) => (
  fetch(`${window.location.origin}/api/circle_connections/${circleConnectionId}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
