'use strict'
const test = require('tape')
const sinon = require('sinon')
const logout = require('./get')

test('Logout', function (t) {
  t.plan(4)
  const sandbox = sinon.sandbox.create()

  const models = {
    cookies: {
      auth: {
        expire: sandbox.stub()
      }
    }
  }
  const req = 'req'
  const res = {
    redirect: sandbox.stub()
  }

  logout(models, req, res)

  t.deepEqual(res.redirect.args[0][0], '/', 'It should call redirect with "/"')
  t.ok(res.redirect.calledOnce, 'It should call redirect once')
  t.deepEqual(models.cookies.auth.expire.args[0][0], res, 'It should call cookie expire with [res]')
  t.ok(models.cookies.auth.expire.args[0], 'It should call expire once')

  sandbox.restore()
})
