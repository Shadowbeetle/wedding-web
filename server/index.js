'use strict'
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888
const localize = require('./localize')

app.use(express.static(publicPath))

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(publicPath, 'views/layouts/'),
  partialsDir: path.join(publicPath, 'views/partials/')
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(publicPath, 'views'))

const texts = require('../public/text/texts.json')

const locale = {
  en: localize(texts, 'en'),
  hu: localize(texts, 'hu')
}

app.get('/', (req , res) => {
  if (req.query.lang === 'en') {
    res.render('body', locale.en)
  } else {
    res.render('body', locale.hu)
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
