'use strict'
const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const extractLocale = require('./extractLocale')

const invertedLocale = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './locale.yaml'), 'utf8'))
const locale = {
  hu: extractLocale([invertedLocale], 'hu'),
  en: extractLocale([invertedLocale], 'en')
}

const contact = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './contact.yaml'), 'utf8'))

module.exports = {
  locale,
  contact
}
