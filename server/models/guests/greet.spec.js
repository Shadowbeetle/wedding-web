'use strict'
const test = require('tape')
const greet = require('./greet')

test('greet', function (t) {
  t.plan(2)
  const names = ['Amy', 'Bruce', 'Charlotte']
  const englishGreeting = greet(names, 'en')
  const hungarianGreeting = greet(names, 'hu')

  t.equals(englishGreeting, 'Amy, Bruce and Charlotte', 'It should greet in English')
  t.equals(hungarianGreeting, 'Amy, Bruce és Charlotte', 'It should greet in English')
})
