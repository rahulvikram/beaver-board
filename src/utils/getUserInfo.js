export async function getUser() {
    const response = await fetch('/api/info', {
      headers: {
        'Cross-Origin-Resource-Policy': 'cross-origin'
      },
      method: 'POST',
      credentials: 'include',
    })
    // get user data from response
    const data = await response.json(); 
    return data.user;
  }