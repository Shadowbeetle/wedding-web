'use strict'
const test = require('tape')
const fetch = require('./util/fetchGetCookies')(require('node-fetch'))
const queryString = require('querystring')
const app = require('./server')

const setupServer = require('./util/setupServer')

const port = 8888 || process.env.PORT
const host = `http://localhost:${port}`

const server = setupServer(app)

function errorCleanup (err, assert, server) {
  server.close()
    .then(() => {
      assert.end(err)
    })
}

function successCleanup (assert, server) {
  server.close()
    .then(() => {
      assert.end()
    })
}

test('not logged in root', function (t) {
  server.listen(port)
    .then(() => fetch(host))
    .then((res) => {
      t.equals(res.status, 200, 'It should respond with 200')
      t.notOk(res.cookies, 'It should not set cookies')
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
})

test('login', function (t) {
  const name = 'kadlecsik ImrE'
  const id = 'aURd8lMnlL'
  const expectedRedirectUrl = 'http://localhost:8888/guest/aURd8lMnlL?lang=hu'

  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape(name)}`, { redirect: 'manual' }))
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
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
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
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
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
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
})

test('logged in root', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('kadlecsik ImrE')}`))
    .then((res) => {
      return fetch(host, {
        redirect: 'manual',
        headers: {
          cookie: `id=${res.cookies.id.value}`
        }
      })
    })
    .then((res) => {
      const location = res.headers.get('location')
      t.equals(res.status, 302, 'It should redirect')
      t.ok(new RegExp(`${host}/guest/\\w{10}`).test(location), 'It should redirect to guest page')
      return fetch(location)
    })
    .then((res) => {
      t.equals(res.status, 200, 'It should respond with 200')
      t.ok(res.cookies.id, 'It should keep id cookie')
      t.ok(res.cookies.id, 'It should keep lang cookie')
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
})

test('logout', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('Kadlecsik Imre')}`))
    .then(() => fetch(`${host}/logout`, { redirect: 'manual' }))
    .then((res) => {
      const location = res.headers.get('location')
      t.equals(res.status, 302, 'It should redirect')
      t.equals(location, `${host}/`, 'it should redirect to the login page')
      return fetch(location)
    })
    .then(() => fetch(host, { redirect: 'manual' }))
    .then((res) => {
      t.equals(res.status, 200, 'Root should not redirect after logout')
      t.notOk(res.cookies, 'It should not set cookies')
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
})

test('straight to guest page', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/guest/aURd8lMnlL`, { redirect: 'manual' }))
    .then((res) => {
    })
    .then(() => successCleanup(t, server))
    .catch((err) => errorCleanup(err, t, server))
})
