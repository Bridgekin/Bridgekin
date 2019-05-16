export const fetchGoogleMatchedContacts = (contacts) => (
  fetch(`${window.location.origin}/api/third_parties/google_contacts?contacts=${contacts}`, {
    method: 'GET',
    headers:{
    	'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
  	}
  })
)
