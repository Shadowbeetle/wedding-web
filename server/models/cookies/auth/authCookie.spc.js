'use strict'
const test = require('tape')
const sinon = require('sinon')
const moment = require('moment')
const authCookie = require('./authCookie')

test('expire authCookie', function (t) {
  t.plan(5)
  const sandbox = sinon.sandbox.create()
  const res = {
    cookie: sandbox.spy()
  }
  const momentSubtract = sandbox.stub(moment.fn, 'subtract').returnsThis()
  const momentToDate = sandbox.stub(moment.fn, 'toDate').returns('yesterday')

  authCookie.expire(res, 'guestId')
  const expectedCookieAttributes = {
    expires: 'yesterday',
    httpOnly: true,
    sameSite: true
  }

  t.deepEqual(res.cookie.args[0], [ 'id', 'guestId', expectedCookieAttributes ],
    'It should set the cookie expiration to yesterday')
  t.ok(res.cookie.calledOnce, 'It should set the cookie only once')

  t.deepEqual(momentSubtract.args[0], [ 1, 'day' ], 'It should subtract a day from today')
  t.ok(momentSubtract.calledOnce, 'It should only calculate the day once')
  t.ok(momentToDate.calledOnce, 'It should only convert the date once')

  sandbox.restore()
})

test('set authCookie', function (t) {
  t.plan(5)
  const sandbox = sinon.sandbox.create()
  const res = {
    cookie: sandbox.spy()
  }
  const momentDuration = sandbox.stub(moment, 'duration').returnsThis()
  const momentValueOf = sandbox.stub(moment, 'valueOf').returns('1month')

  authCookie.set(res, 'guestId')
  const expectedCookieAttributes = {
    maxAge: '1month',
    httpOnly: true,
    sameSite: true
  }

  t.deepEqual(res.cookie.args[0], [ 'id', 'guestId', expectedCookieAttributes ],
    'It should set the cookie expiration to yesterday')
  t.ok(res.cookie.calledOnce, 'It should set the cookie only once')

  t.deepEqual(momentDuration.args[0], [ 1, 'month' ], 'It should subtract a day from today')
  t.ok(momentDuration.calledOnce, 'It should only calculate the day once')
  t.ok(momentValueOf.calledOnce, 'It should only convert the date once')

  sandbox.restore()
})
