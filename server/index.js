'use strict'
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888
const localize = require('./localize')

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


app.get('/', (req , res) => {
  let data = {
    locale: req.query.lang ? locale[req.query.lang] : locale.hu,
    lang: req.query.lang || "hu"
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
