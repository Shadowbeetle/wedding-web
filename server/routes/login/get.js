'use strict'
const _ = require('lodash')
const util = require('../util')

module.exports = function login (models, req, res) {
  const guestName = _.toLower(req.params.guestName)
  const guestId = models.guests.guestLoginToId.get(guestName)
  const lang = req.query.lang

  if (guestId) {
    models.cookies.auth.set(res, guestId)
    util.authRedirect(res, guestId, lang)
  } else {
    let data = {
      locale: models.texts.locale[lang],
      isEnglish: lang === 'en',
      loggedIn: false,
      layout: 'login-layout.hbs',
      unauthorized: true
    }

    res.render('login', data)
  }
}
