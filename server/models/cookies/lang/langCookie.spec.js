'use strict'
const test = require('tape')
const sinon = require('sinon')
const langCookie = require('./langCookie')
const _ = require('lodash')
const moment = require('moment')

test('langCookie.get: get from query param', function (t) {
  t.plan(2)
  const sandbox = sinon.sandbox.create()

  const next = sandbox.spy()
  const req = {
    query: {
      lang: 'en'
    }
  }

  const expectedReq = _.clone(req)

  langCookie.get(req, null, next)
  t.deepEqual(req, expectedReq, 'req should not be modified')
  t.ok(next.calledOnce, 'next() should be called')

  sandbox.restore()
})

test('langCookie.get: get from cookie', function (t) {
  t.plan(2)
  const sandbox = sinon.sandbox.create()

  const next = sandbox.spy()
  const req = {
    cookies: {
      lang: 'en'
    },
    query: {}
  }

  langCookie.get(req, null, next)
  t.equal(req.query.lang, 'en', 'query should be set to the value of cookies.lang')
  t.ok(next.calledOnce, 'next() should be called')

  sandbox.restore()
})

test('langCookie.get: use default', function (t) {
  t.plan(2)
  const sandbox = sinon.sandbox.create()

  const next = sandbox.spy()
  const req = {
    cookies: {},
    query: {}
  }

  langCookie.get(req, null, next)
  t.equal(req.query.lang, 'hu', 'query should be set to the default value')
  t.ok(next.calledOnce, 'next() should be called')

  sandbox.restore()
})

test('langCookie.set: set cookie if lang query param is set', function (t) {
  t.plan(2)
  const sandbox = sinon.sandbox.create()

  sandbox.stub(moment, 'duration').returnsThis()
  sandbox.stub(moment, 'valueOf').returns(1)

  const req = {
    query: {
      lang: 'en'
    }
  }

  const res = {
    cookie: sandbox.spy()
  }

  const expectedArgs = [ 'lang', 'en', { maxAge: 1, sameSite: true } ]
  const next = sandbox.spy()

  langCookie.set(req, res, next)

  t.deepEqual(res.cookie.args[0], expectedArgs, 'lang cookie should be set')
  t.ok(next.calledOnce, 'next() should be called')

  sandbox.restore()
})

test('langCookie.set: no-op if no lang query param is not set', function (t) {
  t.plan(2)
  const sandbox = sinon.sandbox.create()

  sandbox.stub(moment, 'duration').returnsThis()
  sandbox.stub(moment, 'valueOf').returns(1)

  const req = {
    query: {}
  }

  const res = {
    cookie: sandbox.spy()
  }

  const next = sandbox.spy()

  langCookie.set(req, res, next)

  t.ok(res.cookie.notCalled, 'lang cookie should not be set')
  t.ok(next.calledOnce, 'next() should be called')

  sandbox.restore()
})

//
// function get (req, _, next) {
//   req.query.lang = req.query.lang || req.cookies.lang || 'hu'
//   next()
// }
//
// function set (req, res, next) {
//   if (req.query.lang) {
//     res.cookie('lang', req.query.lang, {
//       maxAge: moment.duration(1, 'month').valueOf(),
//       sameSite: true
//     })
//     next()
//   } else {
//     next()
//   }
// }
//
// module.exports = {
//   set,
//   get
// }
