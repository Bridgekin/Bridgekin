export const fetchOpportunities = (workspaceId, option) => (
  fetch(`${window.location.origin}/api/opportunities?option=${option}&workspaceId=${workspaceId}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

//All Opps posted, connected, saved, passed,
export const fetchAllTouchedOpportunities = () => (
  fetch(`${window.location.origin}/api/all_touched_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

//Opps Posted
export const fetchUserOpportunities = () => (
  fetch(`${window.location.origin}/api/user_opportunities`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchProfileOpportunities = (profile_id) => (
  fetch(`${window.location.origin}/api/profile_index?profile_id=${profile_id}`, {
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
