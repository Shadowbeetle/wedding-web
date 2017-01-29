#!/usr/bin/env node
'use strict'
const yaml = require('js-yaml')
const fs = require('fs')

const guestListObj = yaml.safeLoad(fs.readFileSync('../server/models/guestList.yaml', 'utf8'))
const guestIdsObj = {}
for (let key in guestListObj) {
  var guests = guestListObj[key]
  for (var guest of guests) {
    guestIdsObj[guest] = key
  }
}

let yamlString = yaml.safeDump(guestIdsObj)
fs.writeFileSync('../server/models/guestIds.yaml', yamlString)
