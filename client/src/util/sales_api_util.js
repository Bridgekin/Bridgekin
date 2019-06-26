export const searchNetworks = (title) => (
  fetch(`${window.location.origin}/api/sales_networks?title=${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
