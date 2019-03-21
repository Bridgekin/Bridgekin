export const fetchNotifications = () => (
  fetch(`${window.location.origin}/api/notifications`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateAsRead = (notificationIds) => (
  fetch(`${window.location.origin}/api/read_all`, {
    method: 'PATCH',
    body: JSON.stringify({ notificationIds }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
