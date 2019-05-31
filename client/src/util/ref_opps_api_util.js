export const fetchRefOpps = () => (
  fetch(`${window.location.origin}/api/ref_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchRefOpp = id => (
  fetch(`${window.location.origin}/api/ref_opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createRefOpp = refOpp => (
  fetch(`${window.location.origin}/api/ref_opportunities`, {
    method: 'POST',
    body: JSON.stringify({ refOpp }),
    headers:{
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateRefOpp = refOpp => (
  fetch(`${window.location.origin}/api/ref_opportunities/${refOpp.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ refOpp }),
    headers:{
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteRefOpp = id => (
  fetch(`${window.location.origin}/api/ref_opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
