export const fetchInvites = ({permissableType, permissableId}) => (
  fetch(`${window.location.origin}/api/sales_invites?permissableType=${permissableType}&permissableId=${permissableId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const fetchInviteByCode = (code) => (
  fetch(`${window.location.origin}/api/get_invite_code?link_code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)


export const createInvites = (payload) => (
  fetch(`${window.location.origin}/api/sales_invites`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const updateInvite = (payload) => (
  fetch(`${window.location.origin}/api/sales_invites/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const deleteInvite = (inviteId) => (
  fetch(`${window.location.origin}/api/sales_invites/${inviteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

