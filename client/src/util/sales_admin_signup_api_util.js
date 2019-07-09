export const fetchAdminSignupLink = (code) => (
  fetch(`${window.location.origin}/api/admin_signup_links?code=${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": localStorage.getItem('bridgekinToken')
    }
  })
)
