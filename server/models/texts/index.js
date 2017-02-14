'use strict'
const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const invertLocale = require('./invertLocale')

const invertedLocale = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './locale.yaml'), 'utf8'))
const locale = {
  hu: invertLocale([invertedLocale], 'hu'),
  en: invertLocale([invertedLocale], 'en')
}

const contact = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './contact.yaml'), 'utf8'))

module.exports = {
  locale,
  contact
}
