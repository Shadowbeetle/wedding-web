'use strict'
const express = require('express')
const compression = require('compression')
const handlebars = require('express-handlebars')
const path = require('path')
const _ = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const moment = require('moment')

const createMapFromGuestDb = require('./createMapFromGuestDb')
const localize = require('./localize')
const greet = require('./greet')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888


app.use(compression())
app.use(express.static(publicPath))

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(publicPath, 'views/layouts/'),
  partialsDir: path.join(publicPath, 'views/partials/'),
  extname: '.hbs'
}))

app.set('view engine', '.hbs')
app.set('views', path.join(publicPath, 'views'))

const weddingDate = new Date('2017-09-16 15:00').getTime()
const countdownTime = weddingDate - Date.now()
let countdown
if (countdownTime >= 0) {
  const coundownString = moment.duration(countdownTime).humanize().replace(/an?(?! few)/, '1 ')
  countdown = {
    en: 'Only ' + coundownString.replace(/(\d+|few)/, '$1 more') + '!',
    hu: 'Már csak ' + coundownString
      .replace(/years?/, 'év!')
      .replace(/months?/, 'hónap!')
      .replace(/days?/, 'nap!')
      .replace(/hours?/, 'óra!')
      .replace(/minutes?/, 'perc!')
      .replace(/seconds?/, 'másodperc!')
      .replace(/an? few/, 'pár')
  }
} else {
  countdown = {
    en: 'We are married!',
    hu: 'Megházasodtunk!'
  }
}

const texts = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './texts/texts.yaml'), 'utf8'))

const locale = {
  hu: localize([texts], 'hu'),
  en: localize([texts], 'en')
}

const guests = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './models/guestDB.yaml'), 'utf8'))
const { guestIdToGreeting, guestLoginToId } = createMapFromGuestDb(guests)

app.get('/', (req , res) => {
  const lang = req.query.lang

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    loggedIn: false,
    layout: 'login-layout.hbs'
  }

  res.render('login', data)
})

app.get('/guest/:guestId', (req, res) => {
  const lang = req.query.lang
  const guestId = req.params.guestId

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    loggedIn: true,
    greeting: guestId && greet(guestIdToGreeting.get(guestId), lang),
    countdown: lang ? countdown[lang] : countdown.hu
  }

  res.render('wedding', data)
})

app.get('/guest-name/:guestName', (req, res) => {
  const guestName = _.toLower(req.params.guestName)
  const guestId = guestLoginToId.get(guestName)
  if (guestId) {
    res.redirect(`/guest/${guestId}`)
  } else {
    res.status(401).send('401 Unauthorized')
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
