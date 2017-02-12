'use strict'
const authRedirect = require('./authRedirect')

module.exports = function createRootEndpoint(models) {
  return function root(req, res) {
    const lang = req.query.lang

    if (req.cookies.id) {
      authRedirect(res, req.cookies.id, lang)
    } else {
      let data = {
        locale: models.texts.locale[lang],
        isEnglish: lang === "en",
        loggedIn: false,
        layout: 'login-layout.hbs',
      }

      res.render('login', data)
    }
  }
}