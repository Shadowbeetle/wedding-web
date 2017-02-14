'use strict'
const test = require('tape')
const authRedirect = require('./authRedirect')
const sinon = require('sinon')

const sandbox = sinon.sandbox.create()

test('Redirect default language', function (t) {
  t.plan(2)

  const guestId = 'guestId'
  const res = {
    redirect: sandbox.spy()
  }

  authRedirect(res, guestId)

  t.ok(res.redirect.calledOnce, 'res.redirect should be called once')
  t.ok(res.redirect.calledWith('/guest/guestId?lang=hu'),
    'res.redirect should be called with url as follows: /guest/[guestId]?lang=[defaultLang]')

  sandbox.restore()
})

test('Redirect with provided language', function (t) {
  t.plan(2)

  const guestId = 'guestId'

  const res = {
    redirect: sandbox.spy()
  }

  authRedirect(res, guestId, 'en')

  t.ok(res.redirect.calledOnce, 'res.redirect should be called once')
  t.ok(res.redirect.calledWith('/guest/guestId?lang=en'),
    'res.redirect should be called with url as follows: /guest/[guestId]?lang=[lang]')

  sandbox.restore()
})
