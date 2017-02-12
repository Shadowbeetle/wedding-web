'use strict'
const express = require('express')
const compression = require('compression')
const path = require('path')
const _ = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const moment = require('moment')
const cookieParser = require('cookie-parser')

const greet = require('./models/guests/greet')
const authRedirect = require('./routes/root/authRedirect')
const templates = require('./templates')
const models = require('./models')
const routes = require('./routes')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888

app.use(cookieParser())
app.use(models.cookies.lang.set)
app.use(models.cookies.lang.get)
app.use(compression())
app.use(express.static(publicPath))

app.engine('.hbs', templates.setupEngine(publicPath))

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

app.get('/', routes.createRoot(models))

app.get('/guest/:guestId', (req, res) => {
  const lang = req.query.lang
  const guestId = req.params.guestId

  let data = {
    locale: models.texts.locale[lang],
    contact: models.texts.contact,
    isEnglish: lang === "en",
    loggedIn: true,
    greeting: guestId && models.guests.greet(models.guests.guestIdToGreeting.get(guestId), lang),
    countdown: countdown[lang]
  }

  models.cookies.auth.set(res, guestId)
  res.render('wedding', data)
})

app.get('/login/:guestName', (req, res) => {
  const guestName = _.toLower(req.params.guestName)
  const guestId = models.guests.guestLoginToId.get(guestName)
  const lang = req.query.lang

  if (guestId) {
    models.cookies.auth.set(res, guestId)
    authRedirect(res, guestId, lang)
  } else {
    res.status(401).send('401 Unauthorized')
  }
})

app.get('/logout', (req, res) => {
  models.cookies.auth.expire(res)
  res.redirect('/')
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
