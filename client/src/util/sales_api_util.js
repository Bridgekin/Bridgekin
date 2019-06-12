export const searchNetworks = (title) => (
  fetch(`${window.location.origin}/api/sales_networks?title=${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const connectSocial = (payload) => (
  fetch(`${window.location.origin}/api/connect_social`, {
    method: 'POST',
    body: payload,
    headers: {
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
