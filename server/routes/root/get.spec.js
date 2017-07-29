'use strict'
const test = require('tape')
const sinon = require('sinon')
const util = require('../util')
const handleRootCall = require('./get')

const models = {
  texts: {
    locale: {
      en: 'English',
      hu: 'Hungarian'
    }
  }
}

test('Root redirect when logged in', function (t) {
  t.plan(2)
  const req = {
    cookies: {
      id: 'guestId'
    },
    query: {
      lang: 'en'
    }
  }

  const sandbox = sinon.sandbox.create()
  const authRedirectStub = sandbox.stub(util, 'authRedirect')
  const res = 'res'

  const expectedArgs = [ 'res', 'guestId', 'en' ]
  handleRootCall(models, req, res)

  t.deepEqual(authRedirectStub.args[0], expectedArgs, 'It should call authRedirect with [res], [id], and [lang]')
  t.ok(authRedirectStub.calledOnce, 'It should call authRedirect once')

  sandbox.restore()
})

test('Return login page when not logged in', function (t) {
  t.plan(3)
  const request = {
    cookies: {},
    query: {
      lang: 'en'
    }
  }

  const sandbox = sinon.sandbox.create()
  const authRedirectStub = sandbox.stub(util, 'authRedirect')
  const res = {
    render: sandbox.stub()
  }

  const expectedData = {
    locale: 'English',
    isEnglish: true,
    loggedIn: false,
    layout: 'login-layout.hbs',
    unauthorized: false
  }

  const expectedArgs = [ 'login', expectedData ]
  handleRootCall(models, request, res)

  t.deepEqual(res.render.args[0], expectedArgs, 'It should call res.render with "login", [data]')
  t.ok(res.render.calledOnce, 'It should call res.render once')
  t.notOk(authRedirectStub.called, 'It should not redirect')

  sandbox.restore()
})
