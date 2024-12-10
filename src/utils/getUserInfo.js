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

export async function addAssignment(assignment) {
  try {
    const response = await fetch('http://localhost:3000/assignment', {
      method: 'POST',
      body: JSON.stringify(assignment),
      credentials: 'include',
    })
    return response.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}
