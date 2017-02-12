'use strict'

module.exports = function getGuest (models, countdown, req, res) {
  const lang = req.query.lang
  const guestId = req.params.guestId

  let data = {
    locale: models.texts.locale[lang],
    contact: models.texts.contact,
    isEnglish: lang === "en",
    loggedIn: true,
    greeting: guestId && models.guests.greet(models.guests.guestIdToGreeting.get(guestId), lang),
    countdown: countdown.get(lang)
  }

  models.cookies.auth.set(res, guestId)
  res.render('wedding', data)
}