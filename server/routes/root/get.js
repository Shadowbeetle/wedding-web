'use strict'
const util = require('./../util')

module.exports = function root (models, req, res) {
  const lang = req.query.lang

  if (req.cookies.id) {
    util.authRedirect(res, req.cookies.id, lang)
  } else {
    let data = {
      locale: models.texts.locale[lang],
      isEnglish: lang === 'en',
      loggedIn: false,
      layout: 'login-layout.hbs'
    }

    res.render('login', data)
  }
}
