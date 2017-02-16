'use strict'
const test = require('tape')
const sinon = require('sinon')
const consts = require('./consts')
const weddingCountdown = require('./weddingCountdown')

const texts = {
  locale: {
    en: {
      justMarried: 'Just married!'
    },
    hu: {
      justMarried: 'Összeházasodtunk!'
    }
  }
}

const getCountdown = weddingCountdown(texts)

test('Countdown', function (t) {
  t.test('Year, month, day, hour', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2009-06-11 13:14:25').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 1 year, 6 months, 19 days and 11 hours!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 1 év, 6 hónap, 19 nap és 11 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Year, month, day', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2009-06-18 00:00:00').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 1 year, 6 months and 13 days!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 1 év, 6 hónap és 13 nap!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Year, month', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2009-06-01 00:00:00').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 1 year and 7 months!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 1 év és 7 hónap!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Year', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-01-01 00:00:00').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 1 year!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 1 év!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Month, day, hour', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-06-11 13:14:25').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 6 months, 19 days and 11 hours!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 6 hónap, 19 nap és 11 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Day, hour', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-11 13:14:15').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'Only 20 days and 11 hours!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Már csak 20 nap és 11 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })

  t.test('Less than an hour', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 23:58:55').getTime())

    let englishMessage = getCountdown('en')
    let expectedEnglishMessage = 'In less than an hour!'

    let hungarianMessage = getCountdown('hu')
    let expectedHungarianMessage = 'Kevesebb, mint egy óra van hátra!'

    assert.equal(englishMessage, expectedEnglishMessage, `It should say ${expectedEnglishMessage} in English`)
    assert.equal(hungarianMessage, expectedHungarianMessage, `It should say ${expectedHungarianMessage} in Hungarian`)

    sandbox.restore()
  })
})
