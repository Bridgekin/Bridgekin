export const fetchUserNetworks= () => (
  fetch(`${window.location.origin}/api/sales_networks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const searchNetworks = (domain) => (
  fetch(`${window.location.origin}/api/search_sales_networks?domain=${domain}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
