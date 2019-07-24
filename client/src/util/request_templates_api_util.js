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

export const deleteRequestTemplate = (id) => (
  fetch(`${window.location.origin}/api/request_templates/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)