#!/usr/bin/env node
'use strict'
const qr = require('qr-image')
const yaml = require('js-yaml')
const fs = require('fs');
const path = require('path')
const guestListObj = yaml.safeLoad(fs.readFileSync('../server/models/guestList.yaml', 'utf8'))
const dirName = '../qrCodes';

if (!fs.existsSync(dirName)){
  fs.mkdirSync(dirName);
}

const BASE_URL = 'http://anna-tamas-eskuvo.com/'

for (let guestId in guestListObj) {
  let lang = (guestId === '144' || guestId === '145') ? 'en' : 'hu'
  let url = `${BASE_URL}/guest/${guestId}?lang=${lang}`
  let fileName = `${guestListObj[guestId].join('_')}_${guestId}`

  let qrSvg = qr.image(url, { type: 'svg' })
  qrSvg.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.svg`))

  let qrPng = qr.image(url, { type: 'png' })
  qrPng.pipe(require('fs').createWriteStream(`${dirName}/${fileName}.png`))
}

console.log('QR codes can be found in', path.join(__dirname, dirName))
