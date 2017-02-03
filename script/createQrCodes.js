#!/usr/bin/env node
'use strict'
const qr = require('qr-image')
const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path')
const guestListObj = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../server/models/guestList.yaml'), 'utf8'))
const dirName = path.join(__dirname, '../qrCodes')

if (!fs.existsSync(dirName)){
  fs.mkdirSync(dirName);
}

const BASE_URL = 'http://anna-tamas-eskuvo.com'

for (const guestId in guestListObj) {
  const currentGuests = guestListObj[guestId]
  const isEnglish = !!currentGuests
    .filter((guestName) => guestName.includes('Paulina') || guestName.includes('Stasiek'))
    .length

  if (isEnglish) console.log(currentGuests.join(' and '), 'get an english invitation')

  const lang = isEnglish ? 'en' : 'hu'
  const url = `${BASE_URL}/guest/${guestId}?lang=${lang}`
  const fileName = `${currentGuests.join('_')}_${guestId}`

  const qrSvg = qr.image(url, { type: 'svg' })
  qrSvg.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.svg`))

  const qrPng = qr.image(url, { type: 'png' })
  qrPng.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.png`))
}

console.log('QR codes can be found in', path.join(__dirname, dirName))
