export const fetchNetworkInvites = (networkId) => (
  fetch(`${window.location.origin}/api/sales_network_invites?networkId=${networkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const createNetworkInvites = (payload) => (
  fetch(`${window.location.origin}/api/sales_network_invites`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const fetchNetworkInviteByCode = (code) => (
  fetch(`${window.location.origin}/api/get_network_invite_code?link_code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

