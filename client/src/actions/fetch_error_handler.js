export const handleErrors = (res) => {
  // let json = res.json(); // there's always a body
  // debugger
  if (res.ok) {
    return res.json();
  } else if (res.status >= 300 && res.status < 500){
    // For errors that aren't json, need to call .text()
    return res.json().then(err => {throw err;});
  } else {
    return res.text().then(err => {throw err;});
  }
}

export const handleAuthErrors = (res) => {
  // let json = res.json(); // there's always a body
  // debugger
  if (res.ok) {
    return res.json();
  } else {
    return res.text().then(err => {throw err;});
  }
}
