export const setLocal = (key, value) => {
  if (typeof value === 'object') {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  localStorage.setItem(key, value)
}
export const getLocal = (key, isObject) => {
  if (isObject) {
    return JSON.parse(localStorage.getItem(key)) || {}
  }
  return localStorage.getItem(key) || ''
}
