'use strict'
const util = require('./util')

module.exports = async function getGuest (models, getCountdown, req, res) {
  const lang = req.query.lang
  const requestedGuestId = req.params.guestId
  const Guest = models.Guest
  let guest
  try {
    guest = await Guest.findByGuestId(requestedGuestId)
  } catch (err) {
    return res.status(500).send()
  }

  if (guest) {
    let data = {
      locale: models.texts.locale[ lang ],
      contact: models.texts.contact,
      isEnglish: lang === 'en',
      loggedIn: true,
      greeting: util.greet(guest.greetingNames, lang),
      countdown: getCountdown(lang)
    }

    models.cookies.auth.set(res, guest.id)
    return res.render('wedding', data)
  } else {
    let data = {
      locale: models.texts.locale[ lang ],
      isEnglish: lang === 'en',
      loggedIn: false,
      layout: 'login-layout.hbs',
      unauthorized: true
    }

    return res.render('login', data)
  }
}
