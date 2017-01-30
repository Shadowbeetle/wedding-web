'use strict'
const express = require('express')
const compression = require('compression')
const handlebars = require('express-handlebars')
const path = require('path')
const _ = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888
const localize = require('./localize')
const greet = require('./greet')

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

const texts = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './texts/texts.yaml'), 'utf8'))
const navbarTexts = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './texts/navbar.yaml'), 'utf8'))

const locale = {
  hu: localize([texts, navbarTexts], 'hu'),
  en: localize([texts, navbarTexts], 'en')
}

locale.en.churchData = marked(fs.readFileSync(path.join(__dirname, './texts/church-data-en.md'), 'utf8'))
locale.hu.churchData = marked(fs.readFileSync(path.join(__dirname, './texts/church-data-hu.md'), 'utf8'))

const guests = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './models/guestList.yaml'), 'utf8'))
const guestIdsAndNames = new Map(_.toPairs(guests))

app.get('/', (req , res) => {
  const lang = req.query.lang

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    shouldGreet: false,
  }

  res.render('body', data)
})

app.get('/guest/:guestId', (req, res) => {
  const lang = req.query.lang
  const guestId = req.params.guestId

  let data = {
    locale: lang ? locale[lang] : locale.hu,
    isEnglish: lang === "en",
    shouldGreet: true,
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
