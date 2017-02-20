'use strict'
const express = require('express')
const compression = require('compression')
const path = require('path')
const cookieParser = require('cookie-parser')
const templates = require('./templates')
const models = require('./models')
const weddingCountdown = models.Countdown
const routes = require('./routes')
const app = express()
const publicPath = path.join(__dirname, '../public')
const getCountdown = weddingCountdown(models.texts)

app.use(cookieParser())
app.use(models.cookies.lang.set)
app.use(models.cookies.lang.get)
app.use(compression())
app.use(express.static(publicPath))

app.engine('.hbs', templates.setupEngine(publicPath))

app.set('view engine', '.hbs')
app.set('views', path.join(publicPath, 'views'))

app.get('/', routes.root.get.bind(null, models))

app.get('/guest/:guestId', routes.guest.get.bind(null, models, getCountdown))

app.get('/login/:guestName', routes.login.get.bind(null, models))

app.get('/logout', routes.logout.get.bind(null, models))

module.exports = app
