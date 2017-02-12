'use strict'
const moment = require('moment')
const WEDDING_DATE = require('./const').WEDDING_DATE

const countdownTime = WEDDING_DATE - Date.now()

module.exports = class Countdown {
  constructor (texts) {
    if (countdownTime >= 0) {
      const coundownString = moment.duration(countdownTime).humanize().replace(/an?(?! few)/, '1 ')
      this.message = {
        en: 'Only ' + coundownString.replace(/(\d+|few)/, '$1 more') + '!',
        hu: 'Már csak ' + coundownString
          .replace(/years?/, 'év!')
          .replace(/months?/, 'hónap!')
          .replace(/days?/, 'nap!')
          .replace(/hours?/, 'óra!')
          .replace(/minutes?/, 'perc!')
          .replace(/seconds?/, 'másodperc!')
          .replace(/an? few/, 'pár')
      }
    } else {
      this.message = texts.justMarried
    }
  }

  get (lang) {
    return this.message[lang]
  }
}
