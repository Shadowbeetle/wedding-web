'use strict'
const test = require('tape')
const sinon = require('sinon')
const consts = require('./consts')
const Countdown = require('./Countdown')

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

const cd = new Countdown(texts)

test('Countdown', function (t) {
  t.test('1 year before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-01-01 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 1 more year!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 1 év!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 1 more year!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 év!" in Hungarian')

    sandbox.restore()
  })

  t.test('6 months before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-06-18 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 6 more months!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 6 hónap!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 6 more months!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 6 hónap!" in Hungarian')

    sandbox.restore()
  })

  t.test('2 months before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-11-01 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 2 more months!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 2 hónap!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 2 more months!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 hónap!" in Hungarian')

    sandbox.restore()
  })

  t.test('1 month before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-01 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 1 more month!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 1 hónap!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 1 more month!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 hónap!" in Hungarian')

    sandbox.restore()
  })

  t.test('25 days before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-07 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 25 more days!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 25 nap!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 25 more days!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 25 nap!" in Hungarian')

    sandbox.restore()
  })

  t.test('1 day before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 00:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 1 more day!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 1 nap!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 1 more day!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 nap!" in Hungarian')

    sandbox.restore()
  })

  t.test('21 hours before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 03:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 21 more hours!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 21 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 21 more hours!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 21 óra!" in Hungarian')

    sandbox.restore()
  })

  t.test('12 hours before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 12:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 12 more hours!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 12 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 12 more hours!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 12 óra!" in Hungarian')

    sandbox.restore()
  })

  t.test('1 hour before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 23:00:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 1 more hour!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 1 óra!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 1 more hour!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 óra!" in Hungarian')

    sandbox.restore()
  })

  t.test('44 minutes before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 23:16:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 44 more minutes!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 44 perc!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 44 more minutes!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 44 perc!" in Hungarian')

    sandbox.restore()
  })

  t.test('1 minute before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 23:59:00').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only 1 more minute!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak 1 perc!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only 1 more minutes!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak 1 perc!" in Hungarian')

    sandbox.restore()
  })

  t.test('44 seconds before', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2010-12-31 23:59:16').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Only a few more seconds!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Már csak pár másodperc!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Only a few more minutes!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Már csak pár perc!" in Hungarian')

    sandbox.restore()
  })

  t.test('1 second after', function (assert) {
    assert.plan(2)
    const sandbox = sinon.sandbox.create()
    sandbox.stub(consts, 'WEDDING_DATE', new Date('2011-01-01 00:00:00').getTime())

    sandbox.useFakeTimers(new Date('2011-01-01 00:00:01').getTime())

    let englishMessage = cd.get('en')
    let expectedEnglishMessage = 'Just married!'

    let hungarianMessage = cd.get('hu')
    let expectedHungarianMessage = 'Összeházasodtunk!'

    assert.equal(englishMessage, expectedEnglishMessage, 'It should say "Just married!" in English')
    assert.equal(hungarianMessage, expectedHungarianMessage, 'It should say "Összeházasodtunk!" in Hungarian')

    sandbox.restore()
  })
})
