export const fetchSalesIntros = () => (
  fetch(`${window.location.origin}/api/sales_intros`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const fetchSalesIntro = (introId) => (
  fetch(`${window.location.origin}/api/sales_intros/${introId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const createSalesIntro = (salesIntro) => (
  fetch(`${window.location.origin}/api/sales_intros`, {
    method: 'POST',
    body: JSON.stringify({ salesIntro }),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const respondToRequest = (response) => (
  fetch(`${window.location.origin}/api/respond_intro_request`, {
    method: 'PATCH',
    body: JSON.stringify({ response }),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const deleteSalesIntro = (salesIntroId) => (
  fetch(`${window.location.origin}/api/sales_intros/${salesIntroId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
