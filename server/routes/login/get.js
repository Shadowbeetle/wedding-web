'use strict'
const _ = require('lodash')
const util = require('../util')

module.exports = async function login (models, req, res) {
  const guestName = _.toLower(req.params.guestName)
  const lang = req.query.lang
  const Guest = models.Guest
  let guest
  try {
    guest = await Guest.findByName(guestName)
  } catch (err) {
    return res.status(500).send()
  }

  if (guest) {
    models.cookies.auth.set(res, guest.id)
    return util.authRedirect(res, guest.id, lang)
  } else {
    let data = {
      locale: models.texts.locale[lang],
      isEnglish: lang === 'en',
      loggedIn: false,
      layout: 'login-layout.hbs',
      unauthorized: true
    }

    return res.render('login', data)
  }
}
