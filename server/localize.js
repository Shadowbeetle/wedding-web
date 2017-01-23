'use strict'
const _ = require('lodash')

module.exports = function localize (texts, lang) {
  let locale = {}
  for (let textFile of texts) {
    locale = _.reduce(textFile, (result, value, key) => {
      result[key] = value[lang]
      return result
    }, locale)
  }

  return locale
}
