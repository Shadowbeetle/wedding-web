'use strict'
const qr = require('qr-image')
const guestListObj = require('../server/models/greeting.json')
const fs = require('fs');
const dirName = '../qrCodes';

if (!fs.existsSync(dirName)){
  fs.mkdirSync(dirName);
}

const BASE_URL = 'https://kadlecsik-wedding-web.herokuapp.com/'

for (let guestId in guestListObj) {
  let lang = (guestId === '144' || guestId === '145') ? 'en' : 'hu'
  let url = `${BASE_URL}?lang=${lang}&guest=${guestId}`
  let fileName = `${guestId}_${guestListObj[guestId].join('_')}`

  let qrSvg = qr.image(url, { type: 'svg' })
  qrSvg.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.svg`))

  let qrPng = qr.image(url, { type: 'png' })
  qrPng.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.png`))
}
