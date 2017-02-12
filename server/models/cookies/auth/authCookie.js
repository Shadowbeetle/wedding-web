'use strict'
const moment = require('moment')

function expire (res, guestId) {
  res.cookie('id', guestId, {
    expires: moment().subtract(1, 'day').toDate(),
    httpOnly: true,
    sameSite: true
  })
}

function set(res, guestId) {
  res.cookie('id', guestId, {
    maxAge: moment.duration(1, 'month').valueOf(),
    httpOnly: true,
    sameSite: true
  })
}

module.exports = {
  set,
  expire
}