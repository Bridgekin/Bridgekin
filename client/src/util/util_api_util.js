export const requestDemo = (payload) => (
  fetch(`${window.location.origin}/api/notify_request_demo`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const validateUnique = (payload) => (
  fetch(`${window.location.origin}/api/validate_unique`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)