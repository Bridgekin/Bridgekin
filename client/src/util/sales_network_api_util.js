export const fetchUserNetworks= () => (
  fetch(`${window.location.origin}/api/sales_networks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const searchNetworks = (title) => (
  fetch(`${window.location.origin}/api/search_sales_networks?title=${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
