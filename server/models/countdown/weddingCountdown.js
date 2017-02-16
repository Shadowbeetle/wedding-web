'use strict'
const countdown = require('countdown')
const consts = require('./consts')

const COUNTDOWN_SETUP = countdown.YEARS | countdown.MONTHS | countdown.DAYS | countdown.HOURS
module.exports = function setupCountdown (texts) {
  return function getCountdown (lang) {
    const countdownTime = consts.WEDDING_DATE - Date.now()
    if (countdownTime >= 0) {
      const countdownString = countdown(consts.WEDDING_DATE, null, COUNTDOWN_SETUP).toString()
      switch (lang) {
        case 'en':
          return getEnglishMessage(countdownString)
        case 'hu':
          return getHungarianMessage(countdownString)
        default:
          return getHungarianMessage(countdownString)
      }
    } else {
      return texts.locale[lang].justMarried
    }
  }
}

function getEnglishMessage (countdownString) {
  return countdownString
    ? 'Only ' + countdownString + '!'
    : 'In less than an hour!'
}

function getHungarianMessage (countdownString) {
  return countdownString
    ? 'Már csak ' + countdownString
      .replace(/years?/, 'év')
      .replace(/months?/, 'hónap')
      .replace(/days?/, 'nap')
      .replace(/hours?/, 'óra')
      .replace(/minutes?/, 'perc')
      .replace(/seconds?/, 'másodperc')
      .replace(/and/, 'és') + '!'
    : 'Kevesebb, mint egy óra van hátra!'
}
