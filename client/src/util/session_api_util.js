export const signup = user => (
  fetch('api/users', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
  // }).then(res => {
  //   if(res.ok) {
  //     return res.json();
  //   } else {
  //     throw Error(`Request rejected with status ${res.status}`);
  //   }
  // })
  // .catch(console.error)
)

export const login = user => (
  fetch('api/session', {
    method: 'POST',
    body: JSON.stringify({ user }),
    headers:{
    	'Content-Type': 'application/json'
  	}
  })
    // .then(res => {
    //   debugger
    //   return res;
    // })
    // .catch(errors => {
    //   debugger
    //   console.log(errors)
    // })
  // }).then(res => {
  //   debugger
  //   if(res.ok) {
  //     return res.json();
  //   } else {
  //     return reject(res.status, res.json());
  //   }
  // })
  // .catch(console.error)
)

export const logout = () => (
  fetch('api/session', {
    method: 'DELETE'
  })
  // }).then(res => {
  //   if(res.ok) {
  //     return res.json();
  //   } else {
  //     throw Error(`Request rejected with status ${res.status}`);
  //   }
  // })
  // .catch(console.error)
)

export const getAuthUserId = (token) => (
  fetch('api/authorization', {
    headers: {
        "Authorization":token
    },
    method: 'GET'
  })
  // }).then(res => {
  //   if(res.ok) {
  //     return res.json();
  //   } else {
  //     throw Error(`Request rejected with status ${res.status}`);
  //   }
  // })
  // .catch(console.error)
)
