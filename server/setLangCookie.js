'use strict'
const moment = require('moment')

module.exports = function setLangCookie(req, res, next) {
  if (req.query.lang) {
    res.cookie('lang', req.query.lang, {
      maxAge: moment.duration(1, 'month').valueOf(),
      sameSite: true
    })
    next()
  } else {
    next()
  }
}