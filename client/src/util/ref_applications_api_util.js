export const fetchRefApplications = () => (
  fetch(`${window.location.origin}/api/ref_applications`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const fetchRefApplication = id => (
  fetch(`${window.location.origin}/api/ref_applications/${id}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const createRefApplication = refApplication => (
  fetch(`${window.location.origin}/api/ref_applications`, {
    method: 'POST',
    body: JSON.stringify({ refApplication }),
    headers:{
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const updateRefApplication = refApplication => (
  fetch(`${window.location.origin}/api/ref_applications/${refApplication.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ refApplication }),
    headers:{
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)

export const deleteRefApplication = id => (
  fetch(`${window.location.origin}/api/ref_applications/${id}`, {
    method: 'DELETE',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
