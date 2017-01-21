'use strict'
const _ = require('lodash')

module.exports = function localize (texts, lang) {
  return _.reduce(texts, (result, value, key) => {
    result[key] = value[lang]
    return result
  }, {})
}
