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
    body: refApplication,
    headers:{
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

export const updateRefAppStatus = payload => (
  fetch(`${window.location.origin}/api/update_ref_app_status`, {
    method: 'PATCH',
    body: JSON.stringify({ payload }),
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

export const requestDemo = (payload) => (
  fetch(`${window.location.origin}/api/notify_request_demo`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
