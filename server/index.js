'use strict'
const express = require('express')
const compression = require('compression')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const _ = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const moment = require('moment')
const cookieParser = require('cookie-parser')

const createMapFromGuestDb = require('./createMapFromGuestDb')
const localize = require('./localize')
const greet = require('./greet')
const setAuthCookie = require('./setAuthCookie')
const expireAuthCookie = require('./expireAuthCookie')
const authRedirect = require('./authRedirect')
const setLangCookie = require('./setLangCookie')
const getLang = require('./getLang')
const hbsHelpers = require('./handlebarsHelpers')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888

app.use(cookieParser())
app.use(setLangCookie)
app.use(getLang)
app.use(compression())
app.use(express.static(publicPath))

const hbs = expressHandlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(publicPath, 'views/layouts/'),
  partialsDir: path.join(publicPath, 'views/partials/'),
  extname: '.hbs',
  helpers: hbsHelpers
})

app.engine('.hbs', hbs)

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

const invertedLocale = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './texts/locale.yaml'), 'utf8'))

const locale = {
  hu: localize([invertedLocale], 'hu'),
  en: localize([invertedLocale], 'en')
}

const contact = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './texts/contact.yaml'), 'utf8'))

const guests = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './models/guestDB.yaml'), 'utf8'))
const {guestIdToGreeting, guestLoginToId} = createMapFromGuestDb(guests)

app.get('/', (req, res) => {
  const lang = req.query.lang

  if (req.cookies.id) {
    authRedirect(res, req.cookies.id, lang)
  } else {
    let data = {
      locale: locale[lang],
      isEnglish: lang === "en",
      loggedIn: false,
      layout: 'login-layout.hbs',

    }

    res.render('login', data)
  }
})

app.get('/guest/:guestId', (req, res) => {
  const lang = req.query.lang
  const guestId = req.params.guestId

  let data = {
    locale: locale[lang],
    contact,
    isEnglish: lang === "en",
    loggedIn: true,
    greeting: guestId && greet(guestIdToGreeting.get(guestId), lang),
    countdown: countdown[lang]
  }

  setAuthCookie(res, guestId)
  res.render('wedding', data)
})

app.get('/guest-name/:guestName', (req, res) => {
  const guestName = _.toLower(req.params.guestName)
  const guestId = guestLoginToId.get(guestName)
  const lang = req.query.lang

  if (guestId) {
    setAuthCookie(res, guestId)
    authRedirect(res, guestId, lang)
  } else {
    res.status(401).send('401 Unauthorized')
  }
})

app.get('/logout', (req, res) => {
  expireAuthCookie(res)
  res.redirect('/')
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
