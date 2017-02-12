'use strict'
const moment = require('moment')

module.exports = function (res, guestId) {
  res.cookie('id', guestId, {
    expires: moment().subtract(1, 'day').toDate(),
    httpOnly: true,
    sameSite: true
  })
}