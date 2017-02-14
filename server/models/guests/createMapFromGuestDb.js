'use strict'
const _ = require('lodash')

module.exports = function (guestDb) {
  const guestIdToGreeting = new Map()
  const guestLoginToId = new Map()

  for (const guestObj of guestDb) {
    const { id, loginNames, greetingNames } = guestObj
    guestIdToGreeting.set(id, greetingNames)
    loginNames.reduce((result, login) => guestLoginToId.set(_.toLower(login), id), guestLoginToId)
  }

  return { guestIdToGreeting, guestLoginToId }
}
