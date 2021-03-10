export function randString(num) {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, num);
}

export function randStringToUpperCase(num) {
  return "XYZH"
  // return randString(num).toUpperCase();
}
