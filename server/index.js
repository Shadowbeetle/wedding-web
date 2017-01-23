'use strict'
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const _ = require('lodash')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888
const localize = require('./localize')
const greet = require('./greet')

app.use(express.static(publicPath))

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(publicPath, 'views/layouts/'),
  partialsDir: path.join(publicPath, 'views/partials/'),
  extname: '.hbs'
}))

app.set('view engine', '.hbs')
app.set('views', path.join(publicPath, 'views'))

const texts = require('../public/text/texts.json')
const navbarTexts = require('../public/text/navbar.json')

const locale = {
  en: localize([texts, navbarTexts], 'en'),
  hu: localize([texts, navbarTexts], 'hu')
}

const guests = require('./models/greeting.json')
const guestIdsAndNames = new Map(_.toPairs(guests))

app.get('/', (req , res) => {
  const lang = req.query.lang
  const guestId = req.query.guest

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    shouldGreet: !!guestId,
    greeting: guestId && greet(guestIdsAndNames.get(guestId))
  }

  res.render('body', data)
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
