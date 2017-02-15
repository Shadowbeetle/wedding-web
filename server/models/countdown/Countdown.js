'use strict'
const moment = require('moment')
const consts = require('./consts')

module.exports = class Countdown {
  constructor (texts) {
    this.texts = texts
  }

  get (lang) {
    const countdownTime = consts.WEDDING_DATE - Date.now()
    if (countdownTime >= 0) {
      const countdownString = moment.duration(countdownTime).humanize().replace(/an? (?!few)/, '1 ')
      switch (lang) {
        case 'en': return Countdown._getEnglishMessage(countdownString)
        case 'hu': return Countdown._getHungarianMessage(countdownString)
        default: return Countdown._getHungarianMessage(countdownString)
      }
    } else {
      return this.texts.locale[lang].justMarried
    }
  }

  static _getEnglishMessage (countdownString) {
    return 'Only ' + countdownString.replace(/(\d+|few)/, '$1 more') + '!'
  }

  static _getHungarianMessage (countdownString) {
    return 'Már csak ' + countdownString
        .replace(/years?/, 'év!')
        .replace(/months?/, 'hónap!')
        .replace(/days?/, 'nap!')
        .replace(/hours?/, 'óra!')
        .replace(/minutes?/, 'perc!')
        .replace(/seconds?/, 'másodperc!')
        .replace(/an? few/, 'pár')
  }
}
