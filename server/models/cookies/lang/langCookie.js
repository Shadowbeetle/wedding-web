'use strict'
const moment = require('moment')

function get (req, _, next) {
  req.query.lang = req.query.lang || req.cookies.lang || 'hu'
  next()
}

function set (req, res, next) {
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

module.exports = {
  set: set,
  get: get
}
