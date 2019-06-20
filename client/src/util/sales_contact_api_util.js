export const searchByName = (search) => (
  fetch(`${window.location.origin}/api/sales_contacts/search_by_name?fname=${search.fname}&lname=${search.lname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)

export const searchByCharacteristic = (search) => (
  fetch(`${window.location.origin}/api/sales_contacts/search_by_characteristic?title=${search.title}&position=${search.position}&company=${search.company}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
