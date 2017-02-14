'use strict'

module.exports = function logout (models, req, res) {
  models.cookies.auth.expire(res)
  res.redirect('/')
}
