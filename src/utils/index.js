export const getLS = function (key) {
  return window.localStorage.getItem(key)
}

export const setLS = function (key, value) {
  return window.localStorage.setItem(key, value)
}

export const delLS = function (key) {
  return window.localStorage.removeItem(key)
}

