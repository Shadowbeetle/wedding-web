'use strict'
const test = require('tape')
const extractLocale = require('./extractLocale')

test('invertLocale', function (t) {
  t.plan(1)
  const texts = [
    {
      language: {
        en: 'English',
        hu: 'Hungarian'
      },
      stuff: {
        en: 'stuff',
        hu: 'cucc'
      }
    }
  ]
  const expected = {
    language: 'English',
    stuff: 'stuff'
  }

  const lang = 'en'
  const locale = extractLocale(texts, lang)

  t.deepEqual(locale, expected, 'It should extract text in given language')
})
