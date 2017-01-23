'use strict'
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const _ = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')

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

const texts = yaml.safeLoad(fs.readFileSync(path.join(publicPath, '../public/text/texts.yaml'), 'utf8'))
const navbarTexts = yaml.safeLoad(fs.readFileSync(path.join(publicPath, '../public/text/navbar.yaml'), 'utf8'))

const locale = {
  en: localize([texts, navbarTexts], 'en'),
  hu: localize([texts, navbarTexts], 'hu')
}

const guests = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './models/greeting.yaml'), 'utf8'))
const guestIdsAndNames = new Map(_.toPairs(guests))

app.get('/', (req , res) => {
  const lang = req.query.lang
  const guestId = req.query.guest

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    shouldGreet: !!guestId,
    greeting: guestId && greet(guestIdsAndNames.get(guestId), lang)
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
