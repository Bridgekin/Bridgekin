export const fetchRequestTemplates = () => (
  fetch(`${window.location.origin}/api/request_templates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const createRequestTemplate = (payload) => (
  fetch(`${window.location.origin}/api/request_templates`, {
    method: 'POST',
    body: JSON.stringify( payload ),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const deleteRequestTemplate = (templateId) => (
  fetch(`${window.location.origin}/api/request_templates?templateId=${templateId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)