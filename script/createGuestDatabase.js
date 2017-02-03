#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')
const program = require('commander')
const yaml = require('js-yaml')

function main() {
  program
    .version('1.0.0')
    .option('-n, --no-header', 'Do not throw away the first row')
    .option('-i, --invert', 'Use the inverse of names too (Chinese/Hungarian name order) eg. John Smith => John Smith, Smith John')
    .option('-t, --triple-name-order [order]',
      'If -i is set, define order of  middle name reformatting, eg. to turn John Edward Smith to Smith John Edward (Hungarian name order) set it to 312', getNameOrder)

  program.parse(process.argv)

  const GROUP_IDX = 0
  const GREETING_NAME_IDX = 1

  const guestList = fs.readFileSync(path.join(__dirname, '../input/guest-list.csv'), 'utf-8')

  const lines = program.header ? guestList.split(/\r?\n/).slice(1) : guestList.split(/\r?\n/)


  const guestMap = new Map()

  for (const line of lines) {
    const row = line.split(',')
    const group = row[GROUP_IDX]
    const greetingName = row[GREETING_NAME_IDX]
    let loginNames = row.slice(GREETING_NAME_IDX + 1)
      .filter((name) => !!name && name !== '-')
      .map((name) => name.split(' '))

    loginNames = loginNames.reduce((result, name) => {
      if (name.length === 2 && program.invert) {
        return [...result, name.join(' '), name.reverse().join(' ')]
      } else if (name.length === 3 && program.invert && program.tripleNameOrder) {
        return [...result, name.join(' '), reorderTripleName(program.tripleNameOrder, name).join(' ')]
      } else {
        result.push(name.join(' '))
        return result
      }
    }, [])

    if (!guestMap.has(group)) {
      guestMap.set(group, {
        id: makeId(10),
        loginNames,
        greetingNames: [greetingName]
      })
    } else {
      const guestObj = guestMap.get(group)

      guestObj.loginNames = guestObj.loginNames.concat(loginNames)
      guestObj.greetingNames.push(greetingName)

      guestMap.set(group, guestObj)
    }
  }

  const yamlString = yaml.safeDump([...guestMap.values()])
  const outPath = path.join(__dirname, '../server/models/guestDB.yaml')
  fs.writeFileSync(outPath, yamlString)
  console.log('DB is written to', outPath)
}

function getNameOrder(string) {
  return string.split('').map((s) =>
  parseInt(s) - 1)
}

function reorderTripleName(pattern, name) {
  return [name[pattern[0]], name[pattern[1]], name[pattern[2]]]
}

const makeId = (function () {
  const ids = new Set()
  return (length) => {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    const id = ids.has(text) ? makeId(text) : text
    ids.add(text)

    return id
  }
})()

main()