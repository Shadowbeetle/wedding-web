'use strict'
const test = require('tape')
const sinon = require('sinon')
const serveGuest = require('./get')

const req = {
  params: {
    guestId: 'guestId'
  },
  query: {
    lang: 'en'
  }
}

test('Logged in response for guest', function (t) {
  t.plan(10)

  const sandbox = sinon.sandbox.create()
  const res = {
    render: sandbox.stub()
  }

  const countdown = {
    get: sandbox.stub().returns('countdown')
  }

  const models = {
    texts: {
      locale: {
        en: 'English',
        hu: 'Hungarian'
      },
      contact: 'contact'
    },
    guests: {
      greet: sandbox.stub().returns('Hello there!'),
      guestIdToGreeting: {
        get: sandbox.stub().returns([ 'Hello', 'there' ])
      }
    },
    cookies: {
      auth: {
        set: sandbox.stub()
      }
    }
  }

  const expectedData = {
    locale: 'English',
    contact: 'contact',
    isEnglish: true,
    loggedIn: true,
    greeting: 'Hello there!',
    countdown: 'countdown'
  }

  serveGuest(models, countdown, req, res)

  t.deepEqual(res.render.args[0], [ 'wedding', expectedData ], 'It should call res.render with "wedding", [data]')
  t.ok(res.render.calledOnce, 'It should redirect once')

  t.deepEqual(models.cookies.auth.set.args[0], [res, 'guestId'], 'It should call set the auth cookie with [res], [guestName]')
  t.ok(models.cookies.auth.set.calledOnce, 'It should set the auth cookie once')

  t.deepEqual(models.guests.greet.args[0], [ ['Hello', 'there'], 'en' ], 'It should call greet with parts of greeting, [lang]')
  t.ok(models.guests.greet.calledOnce, 'It should greet once')

  t.deepEqual(models.guests.guestIdToGreeting.get.args[0][0], 'guestId', 'It should get greeting for guestId with [guestID]')
  t.ok(models.guests.guestIdToGreeting.get.calledOnce, 'It should get greeting once')

  t.deepEqual(countdown.get.args[0][0], 'en', 'It should get countdown for [lang]')
  t.ok(countdown.get.calledOnce, 'It should get countdown once')

  sandbox.restore()
})
