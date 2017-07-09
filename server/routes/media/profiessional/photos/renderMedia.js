'use strict'
module.exports = function renderMedia (models, req, res) {
  const lang = req.query.lang

  let data = {
    locale: models.texts.locale[lang],
    loggedIn: true,
    layout: 'media.hbs'
  }

  res.render('media', data)
}
