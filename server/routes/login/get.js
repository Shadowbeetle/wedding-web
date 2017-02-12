'use strict'
const _ = require('lodash')
const authRedirect = require('../util/authRedirect')

module.exports = function login (models, req, res) {
  const guestName = _.toLower(req.params.guestName)
  const guestId = models.guests.guestLoginToId.get(guestName)
  const lang = req.query.lang

  if (guestId) {
    models.cookies.auth.set(res, guestId)
    authRedirect(res, guestId, lang)
  } else {
    res.status(401).send('401 Unauthorized')
  }
}