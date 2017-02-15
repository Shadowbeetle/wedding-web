'use strict'
const test = require('tape')
const createMapFromGuestDb = require('./createMapFromGuestDb')

test('createMapFromGuestDb', function (t) {
  t.plan(1)
  const guestDb = [
    {
      id: 'id',
      loginNames: [
        'login1',
        'login2'
      ],
      greetingNames: [
        'greeting1',
        'greeting2'
      ]
    }
  ]

  const expected = {
    guestIdToGreeting: new Map([ [ 'id', [ 'greeting1', 'greeting2' ] ] ]),
    guestLoginToId: new Map([ [ 'login1', 'id' ], [ 'login2', 'id' ] ])
  }
  const result = createMapFromGuestDb(guestDb)
  t.deepEqual(result, expected, 'It should create an object of 2 maps out of guestDb: login -> id, id -> greeting')
})
