export const fetchAdminSignupLink = (networkId) => (
  fetch(`${window.location.origin}/api/sales_network_invites?networkId=${networkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
