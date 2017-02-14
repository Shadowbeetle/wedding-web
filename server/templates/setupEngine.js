'use strict'
const path = require('path')
const expressHandlebars = require('express-handlebars')
const helpers = require('./helpers')

function setupEngine (publicPath) {
  return expressHandlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(publicPath, 'views/layouts/'),
    partialsDir: path.join(publicPath, 'views/partials/'),
    extname: '.hbs',
    helpers: helpers
  })
}

module.exports = setupEngine
