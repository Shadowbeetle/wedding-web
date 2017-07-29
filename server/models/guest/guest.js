'use strict'
require('../db')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const MODEL_NAME = 'guest'

/**
 * @typedef {Object} Guest
 * @property {string} id
 * @property {string[]} loginNames
 * @property {string[]} greetingNames
 * @property {string} email
 * @property {"en"|"hu"} email
 */
const guestSchema = new Schema({
  id: {
    type: String, required: true, unique: true, index: true
  },
  loginNames: {
    type: [String], required: true, index: true, unique: true, trim: true
  },
  greetingNames: {
    type: [String], required: true
  },
  email: {
    type: String, unique: true
  },
  preferredLanguage: {
    type: String, enum: ['en', 'hu']
  }
})

guestSchema.pre('save', function (next) {
  this.loginNames = this.loginNames.map((name) => name.toLowerCase())
  next()
})

guestSchema.pre('update', function (next) {
  this.loginNames = this.loginNames.map((name) => name.toLowerCase())
  next()
})

const Guest = mongoose.model(MODEL_NAME, guestSchema)

/**
 * Get a guest by ObjectId
 * @param {string|ObjectId} id
 * @param {object=} projection
 * @returns {Query|Promise.<Guest>}
 */
Guest.findByGuestId = function (id, projection) {
  return Guest.findOne({ id: id }, projection)
}

Guest.findByName = function (name, projection) {
  return Guest.findOne({ loginNames: name.toLowerCase() }, projection)
}

Guest.greet = function () {}

/**
 * Register a new guest
 * @param {Guest} newGuest
 * @returns {Query|Promise}
 */
Guest.add = function (newGuest) {
  return new Guest(newGuest).save()
}

module.exports = Guest
