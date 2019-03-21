export const fetchNotificationSettings = () => (
  fetch(`${window.location.origin}/api/notification_settings`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateNotificationSetting = (notificationSetting) => (
  fetch(`${window.location.origin}/api/notification_settings`, {
    method: 'PATCH',
    body: JSON.stringify({ notificationSetting }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
