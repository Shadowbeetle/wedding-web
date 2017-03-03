'use strict'
const test = require('tape')
const fetch = require('./util/fetchGetCookies')(require('node-fetch'))
const queryString = require('querystring')
const app = require('./server')

const setupServer = require('./util/setupServer')

const port = 8888 || process.env.PORT
const host = `http://localhost:${port}`

const server = setupServer(app)

test('not logged in root', function (t) {
  server.listen(port)
    .then(() => fetch(host))
    .then((res) => {
      t.equals(res.status, 200, 'It should respond with 200')
      t.notOk(res.cookies, 'It should not set cookies')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('login', function (t) {
  const name = 'kadlecsik ImrE'
  const id = 'aURd8lMnlL'
  const expectedRedirectUrl = 'http://localhost:8888/guest/aURd8lMnlL?lang=hu'

  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape(name)}`, {redirect: 'manual'}))
    .then((res) => {
      const location = res.headers.get('location')
      t.equals(res.status, 302, 'It should redirect and should be case insensitive')
      t.equals(res.cookies.id.value, id, 'It should set the id')
      t.equals(location, expectedRedirectUrl, 'it should redirect to the proper page')
      return fetch(location)
    })
    .then((res) => {
      t.equals(res.status, 200, 'It should redirect with 200')
      t.equals(res.cookies.id.value, id, 'It should keep the id after redirect')
      t.equals(res.cookies.lang.value, 'hu', 'It should use the default language if nothing is specified')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('login keep language', function (t) {
  const name = 'kadlecsik ImrE'
  const id = 'aURd8lMnlL'
  const expectedRedirectUrl = 'http://localhost:8888/guest/aURd8lMnlL?lang=en'

  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape(name)}?lang=en`, { redirect: 'manual' }))
    .then((res) => {
      const location = res.headers.get('location')
      t.equals(res.status, 302, 'It should redirect and should be case insensitive')
      t.equals(res.cookies.id.value, id, 'It should set the id')
      t.equals(location, expectedRedirectUrl, 'it should redirect to the proper page keeping the language')
      return fetch(location)
    })
    .then((res) => {
      t.equals(res.status, 200, 'It should redirect with 200')
      t.equals(res.cookies.lang.value, 'en', 'It should keep the language after redirect')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('login fail', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('should not be present')}`))
    .then((res) => {
      t.equals(res.status, 401, 'It should not allow unauthorized login')
      return res.text()
    })
    .then((text) => {
      t.equals(text, '401 Unauthorized', 'It should let the user know of the failure')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('logged in root', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('kadlecsik ImrE')}`))
    .then(() => fetch(host))
    .then((res) => {
      t.equals(res.status, 200, 'It should respond with 200')
      t.notOk(res.cookies, 'It should not set cookies')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

/* eslint-disable */
test('logout')

test('logged out guest page')

test('logged in guest page')
