export const fetchEmailNotification = () => (
  fetch(`${window.location.origin}/api/email_notifications`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createEmailNotification = (emailNotification) => (
  fetch(`${window.location.origin}/api/email_notifications`, {
    method: 'POST',
    body: JSON.stringify({ emailNotification }),
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
