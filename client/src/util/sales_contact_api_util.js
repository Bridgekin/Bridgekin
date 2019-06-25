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