'use strict'
const express = require('express')
const whiskers = require('whiskers')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888

app.use(express.static(publicPath))

app.engine('.html', whiskers.__express)
app.set('view engine', 'html')
app.set('views', publicPath + '/views')

const locale = require('../public/text/texts.json')

app.get('/', (req, res) => {
  if (req.query.lang === 'en') {
    res.render('index', locale.en)
  } else {
    res.render('index', locale.hu)
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
