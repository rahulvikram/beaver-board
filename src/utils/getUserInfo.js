export async function getUser() {
    const response = await fetch('/api/info', {
      headers: {
        'Cross-Origin-Resource-Policy': 'cross-origin'
      },
      method: 'POST',
      credentials: 'include',
    })
    // get user data from response
    const data = await response.json()
    const user = {
      id: "OBz3Qb0DVHKyJtAvK6e8",
      email: "indian@example.com",
      name: "Rahul Vikram",
      password: "password",
      classes: {
          "0lv92s48vK": {
              name: "CS162",
              assignments: {
                  "30a36953-79b9-4e43-9a6e-b9130e95297e": {
                      id: "30a36953-79b9-4e43-9a6e-b9130e95297e",
                      name: "Exam 1",
                      due: 300,
                      points: 100,
                      type: "exam"
                  },
                  "83519aff-0dcf-466a-9cc6-91503d979762": {
                      id: "83519aff-0dcf-466a-9cc6-91503d979762",
                      name: "Assignment 2",
                      due: 300,
                      points: 1,
                      type: "assignment"
                  }
              }
          }
      }
      }; 
  
      return data.user;
  }