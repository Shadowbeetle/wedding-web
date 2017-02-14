'use strict'
const test = require('tape')
const sinon = require('sinon')
const util = require('../util')
const login = require('./get')

test('Login - authorized', function (t) {
  t.plan(6)
  const sandbox = sinon.sandbox.create()

  const req = {
    params: {
      params: {
        guestName: 'Guest Name'
      }
    },
    query: {
      lang: 'en'
    }
  }

  const models = {
    cookies: {
      auth: {
        set: sandbox.stub()
      }
    },
    guests: {
      guestLoginToId: {
        get: sandbox.stub().returns('guestId')
      }
    }
  }

  const res = {
    status: sandbox.stub().returnsThis(),
    send: sandbox.stub().returnsThis()
  }
  const authRedirectStub = sandbox.stub(util, 'authRedirect')

  login(models, req, res)

  t.deepEqual(authRedirectStub.args[0], [res, 'guestId', 'en'], 'It should call authRedirect with [res], [id], and [lang]')
  t.ok(authRedirectStub.calledOnce, 'It should call authRedirect once')
  t.deepEqual(models.cookies.auth.set.args[0], [res, 'guestId'], 'It should call set the auth cookie with [res], [guestName]')
  t.ok(models.cookies.auth.set.calledOnce, 'It should set the auth cookie once')

  t.notOk(res.send.called, 'It should not call res.send')
  t.notOk(res.status.called, 'It should not call res.status')

  sandbox.restore()
})

test('Login - unauthorized', function (t) {
  t.plan(6)
  const sandbox = sinon.sandbox.create()

  const req = {
    params: {
      params: {
        guestName: 'Guest Name'
      }
    },
    query: {
      lang: 'en'
    }
  }

  const models = {
    cookies: {
      auth: {
        set: sandbox.stub()
      }
    },
    guests: {
      guestLoginToId: {
        get: sandbox.stub().returns('')
      }
    }
  }

  const res = {
    status: sandbox.stub().returnsThis(),
    send: sandbox.stub().returnsThis()
  }
  const authRedirectStub = sandbox.stub(util, 'authRedirect')

  login(models, req, res)

  t.deepEqual(res.status.args[0][0], 401, 'It should call res.status with 401')
  t.ok(res.status.calledOnce, 'It should call res.status once')
  t.deepEqual(res.send.args[0][0], '401 Unauthorized', 'res.send with "401 Unauthorized"')
  t.ok(res.send.calledOnce, 'It should call res.send once')

  t.notOk(authRedirectStub.called, 'It should not call authRedirect')
  t.notok(models.cookies.auth.set.called, 'It should not set the auth cookie')

  sandbox.restore()
})
