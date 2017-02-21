'use strict'
const cookie = require('cookie')

module.exports = function addFetchCookies (fetch) {
  return function fetchWithCookies (url, opts) {
    return fetch(url, opts)
      .then((res) => {
        const setCookieHeader = res.headers._headers['set-cookie']
        if (setCookieHeader) {
          res.cookies = createCookiesObject(setCookieHeader)
        }
        return res
      })
  }
}

function createCookiesObject (setCookieHeader) {
  return setCookieHeader.reduce(parseCookieStringIntoCookies, {})
}

function parseCookieStringIntoCookies (cookies, cookieString) {
  const cookieObj = cookie.parse(cookieString)
  const keys = Object.keys(cookieObj)

  cookies[keys[0]] = Object.assign(cookieObj, { value: cookieObj[keys[0]] })
  delete cookieObj[keys[0]]

  return cookies
}
