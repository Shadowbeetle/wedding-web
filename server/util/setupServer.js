'use strict'

module.exports = function setupServer (app) {
  return {
    listen (port) {
      return new Promise((resolve, reject) => {
        this._server = app.listen(port, (err) => {
          if (err) reject(err)
          return resolve()
        })
      })
    },
    close () {
      return new Promise((resolve, reject) => {
        this._server.close((err) => {
          if (err) reject(err)
          return resolve()
        })
      })
    }
  }
}
