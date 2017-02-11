'use strict'
module.exports = function getLang (req, _, next) {
  req.query.lang = req.query.lang || req.cookies.lang || 'hu'
  next()
}