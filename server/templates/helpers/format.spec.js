'use strict'
const test = require('tape')
const format = require('./format')
const Handlebars = require('handlebars')

test('format newlines', (t) => {
  t.plan(2)
  const testString = 'a\nb'
  const expected = { string: 'a<br>b' }

  const result = format(testString)
  t.deepEqual(result, expected)

  t.equal(result.constructor, Handlebars.SafeString)
})
