'use strict'
const _ = require('lodash')

module.exports = function greet (names, lang) {
  if (names[0] === 'Visitor') {
    return lang === 'en' ? names[0] : 'Látogató'
  }
  return names.reduce(composeGreeting(lang), '')
}

const composeGreeting = _.curry(function (lang, result, name, idx, names) {
  if (idx === 0) {
    return name
  } else if (idx === names.length - 1) {
    return `${result} ${lang === 'en' ? 'and' : 'és'} ${name}`
  } else {
    return `${result}, ${name}`
  }
})
