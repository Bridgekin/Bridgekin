export const searchContacts = (search) => (
  fetch(`${window.location.origin}/api/sales_contacts/search`, {
    method: 'POST',
    body: JSON.stringify(search),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const connectSocial = (payload) => (
  fetch(`${window.location.origin}/api/sales_contacts/connect_social`, {
    method: 'POST',
    body: payload,
    headers: {
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const presignedUrl = (filename, filetype) => (
  fetch(`${window.location.origin}/api/sales_contacts/presigned_url?filename=${filename}&filetype=${filetype}`, {
    method: 'GET',
    headers: {
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const uploadToS3 = ({ url, formData, fileType }) => (
  fetch(`${url}`, {
    method: 'PUT',
    body: formData,
    headers: {
      "Content-Type": fileType
    }
  })
)