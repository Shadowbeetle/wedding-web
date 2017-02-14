'use strict'
module.exports = function authRedirect (res, guestId, lang) {
  res.redirect(`/guest/${guestId}?lang=${lang || 'hu'}`)
}
