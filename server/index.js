'use strict'
const express = require('express')
const compression = require('compression')
const path = require('path')
const cookieParser = require('cookie-parser')

const templates = require('./templates')
const models = require('./models')
const Countdown = models.Countdown
const routes = require('./routes')

const app = express()
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 8888

const countdown = new Countdown(models.texts)

app.use(cookieParser())
app.use(models.cookies.lang.set)
app.use(models.cookies.lang.get)
app.use(compression())
app.use(express.static(publicPath))

app.engine('.hbs', templates.setupEngine(publicPath))

app.set('view engine', '.hbs')
app.set('views', path.join(publicPath, 'views'))

app.get('/', routes.root.get.bind(null, models))

app.get('/guest/:guestId', routes.guest.get.bind(null, models, countdown))

app.get('/login/:guestName', routes.login.get.bind(null, models))

app.get('/logout', routes.logout.get.bind(null, models))

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
