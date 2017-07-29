'use strict'
const test = require('tape')
const sinon = require('sinon')
const util = require('../util')
const login = require('./get')

test('Login - authorized', async function (t) {
  t.plan(6)
  const sandbox = sinon.sandbox.create()

  const req = {
    params: {
      guestName: 'Guest Name'
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
    Guest: {
      findByName: sandbox.spy(function () {
        return Promise.resolve({
          id: 'guestId',
          greetingNames: [ 'Tom', 'Barbara' ]
        })
      })
    }
  }

  const res = {
    status: sandbox.stub().returnsThis(),
    send: sandbox.stub().returnsThis()
  }
  const authRedirectStub = sandbox.stub(util, 'authRedirect')

  await login(models, req, res)

  t.deepEqual(authRedirectStub.args[0], [res, 'guestId', 'en'], 'It should call authRedirect with [res], [id], and [lang]')
  t.ok(authRedirectStub.calledOnce, 'It should call authRedirect once')
  t.deepEqual(models.cookies.auth.set.args[0], [res, 'guestId'], 'It should call set the auth cookie with [res], [guestName]')
  t.ok(models.cookies.auth.set.calledOnce, 'It should set the auth cookie once')

  t.notOk(res.send.called, 'It should not call res.send')
  t.notOk(res.status.called, 'It should not call res.status')

  sandbox.restore()
})

test('Login - case sensitivity', async function (t) {
  t.plan(1)
  const sandbox = sinon.sandbox.create()

  const req = {
    params: {
      guestName: 'GUEST NAME'
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
    Guest: {
      findByName: sandbox.spy(function () {
        return Promise.resolve({
          id: 'guestId',
          greetingNames: [ 'Tom', 'Barbara' ]
        })
      })
    }
  }

  const res = {
    status: sandbox.stub().returnsThis(),
    send: sandbox.stub().returnsThis()
  }
  const authRedirectStub = sandbox.stub(util, 'authRedirect')

  await login(models, req, res)

  t.deepEqual(authRedirectStub.args[0], [res, 'guestId', 'en'], 'It should be case insensitive')

  sandbox.restore()
})

test('Login - unauthorized', async function (t) {
  t.plan(4)
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
    Guest: {
      findByName: sandbox.spy(function () {
        return Promise.resolve(null)
      })
    },
    texts: {
      locale: {
        en: { foo: 'bar' },
        hu: { valami: 'cucc' }
      }
    }
  }

  const res = {
    render: sandbox.spy()
  }
  const authRedirectStub = sandbox.stub(util, 'authRedirect')

  await login(models, req, res)

  t.ok(res.render.calledOnce, 'It should call res.render once')
  t.deepEqual(res.render.args[ 0 ], [ 'login', {
    locale: { foo: 'bar' },
    isEnglish: true,
    loggedIn: false,
    layout: 'login-layout.hbs',
    unauthorized: true
  } ], 'It should render login with error message')
  t.notOk(authRedirectStub.called, 'It should not call authRedirect')
  t.notok(models.cookies.auth.set.called, 'It should not set the auth cookie')

  sandbox.restore()
})
