#!/usr/bin/env node
'use strict'
const qr = require('qr-image')
const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path')
const guestDb = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../server/models/guests/guestDB.yaml'), 'utf8'))
const dirName = path.join(__dirname, '../qrCodes')

if (!fs.existsSync(dirName)){
  fs.mkdirSync(dirName);
}

const BASE_URL = 'http://anna-tamas-eskuvo.com'

for (const guestObj of guestDb) {
  const { greetingNames, id } = guestObj
  const isEnglish = !!greetingNames
    .filter((guestName) => guestName.includes('Paulina') || guestName.includes('Stasiek'))
    .length

  if (isEnglish) console.log(greetingNames.join(' and '), 'get an english invitation')

  const lang = isEnglish ? 'en' : 'hu'
  const url = `${BASE_URL}/guest/${id}?lang=${lang}`
  const fileName = `${greetingNames.join('_')}_${id}`

  const qrSvg = qr.image(url, { type: 'svg' })
  qrSvg.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.svg`))

  const qrPng = qr.image(url, { type: 'png' })
  qrPng.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.png`))
}

console.log('QR codes can be found in',  dirName)
