'use strict'
const test = require('tape')
const fetch = require('isomorphic-fetch')
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
      t.equals(res.headers.get('id'), null, 'It should not set id cookie')
      t.equals(res.headers.get('lang'), null, 'It should not set lang cookie')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('login', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('kadlecsik ImrE')}`))
    .then((res) => {
      t.equals(res.status, 200, 'It should respond with 200 and should be case insensitive')
      t.equals(res.headers.get('id'), null, 'It should not set id cookie')
      t.equals(res.headers.get('lang'), null, 'It should not set lang cookie')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('login fail', function (t) {
  server.listen(port)
    .then(() => fetch(`${host}/login/${queryString.escape('should not be present')}`))
    .then((res) => {
      t.equals(res.status, 401, 'It should not let allow login')
      return res.text()
    })
    .then((text) => {
      t.equals(text, '401 Unauthorized', 'It should let the user know of the failure')
      return server.close()
    })
    .then(() => t.end())
    .catch((err) => t.end(err))
})

test('logged in root')

test('logout')

test('logged out guest page')

test('logged in guest page')
