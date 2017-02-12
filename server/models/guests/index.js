'use strict'
const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const createMap = require('./createMapFromGuestDb')
const greet = require('./greet')
const guests = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './guestDB.yaml'), 'utf8'))

const { guestIdToGreeting, guestLoginToId } = createMap(guests)

module.exports = {
  guestIdToGreeting,
  guestLoginToId,
  greet
}
