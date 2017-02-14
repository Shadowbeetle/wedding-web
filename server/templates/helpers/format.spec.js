'use strict'
const test = require('tape')
const format = require('./format')
const Handlebars = require('handlebars')

test('format helper', (t) => {
  t.plan(2)
  const testString = 'a\nb'
  const expected = { string: 'a<br>b' }

  const result = format(testString)
  t.deepEqual(result, expected, 'Returned value should look like { string: "a<br>b" }')

  t.equal(result.constructor, Handlebars.SafeString, 'Returned value should be a Handlebars.SafeString')
})
