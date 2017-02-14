'use strict'
const Handlebars = require('handlebars')

module.exports = function format (text) {
  text = Handlebars.Utils.escapeExpression(text)
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>')
  return new Handlebars.SafeString(text)
}
