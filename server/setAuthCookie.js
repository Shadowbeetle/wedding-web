'use strict'
const moment = require('moment')

module.exports = function (res, guestId) {
  res.cookie('id', guestId, {
    maxAge: moment.duration(1, 'month').valueOf(),
    httpOnly: true,
    sameSite: true
  })
}