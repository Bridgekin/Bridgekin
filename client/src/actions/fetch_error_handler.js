export const handleErrors = (res) => {
  debugger
  let json = res.json(); // there's always a body
  if (res.ok) {
    return json;
  } else {
    return json.then(err => {throw err;});
  }
}
