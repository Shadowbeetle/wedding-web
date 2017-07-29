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

test('Logged in response for guest', async function (t) {
  t.plan(8)

  const sandbox = sinon.sandbox.create()
  const res = {
    render: sandbox.spy()
  }

  const getCountdown = sandbox.spy(function () {
    return 'countdown'
  })

  const models = {
    texts: {
      locale: {
        en: 'English',
        hu: 'Hungarian'
      },
      contact: 'contact'
    },
    Guest: {
      findByGuestId: sandbox.spy(function () {
        return Promise.resolve({
          id: 'guestId',
          greetingNames: [ 'Tom', 'Barbara' ]
        })
      })
    },
    cookies: {
      auth: {
        set: sandbox.spy()
      }
    }
  }

  const expectedData = {
    locale: 'English',
    contact: 'contact',
    isEnglish: true,
    loggedIn: true,
    greeting: 'Tom and Barbara',
    countdown: 'countdown'
  }

  await serveGuest(models, getCountdown, req, res)

  t.deepEqual(res.render.args[ 0 ], [ 'wedding', expectedData ], 'It should call res.render with "wedding", [data]')
  t.ok(res.render.calledOnce, 'It should redirect once')

  t.deepEqual(models.cookies.auth.set.args[ 0 ], [ res, 'guestId' ], 'It should call set the auth cookie with [res], [guestName]')
  t.ok(models.cookies.auth.set.calledOnce, 'It should set the auth cookie once')

  t.deepEqual(models.Guest.findByGuestId.args[ 0 ][ 0 ], 'guestId', 'It should get guest for the required guestId')
  t.ok(models.Guest.findByGuestId.calledOnce, 'It should get greeting once')

  t.deepEqual(getCountdown.args[ 0 ][ 0 ], 'en', 'It should get countdown for [lang]')
  t.ok(getCountdown.calledOnce, 'It should get countdown once')

  sandbox.restore()
})
