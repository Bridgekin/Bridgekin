export const fetchOpportunities = (workspaceId, networkId) => (
  fetch(`${window.location.origin}/api/opportunities?networkId=${networkId}&workspaceId=${workspaceId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchUserOpportunities = (networkId) => (
  fetch(`${window.location.origin}/api/userOpportunities?networkId=${networkId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchOpportunity = id => (
  fetch(`${window.location.origin}/api/opportunities/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createOpportunity = formData => (
  fetch(`${window.location.origin}/api/opportunities`, {
    method: 'POST',
    body: formData,
    headers:{
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateOpportunity = formData => (
  fetch(`${window.location.origin}/api/opportunities/${formData.get('opportunity[id]')}`, {
    method: 'PATCH',
    body: formData,
    headers:{
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteOpportunity = id => (
  fetch(`${window.location.origin}/api/opportunities/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
