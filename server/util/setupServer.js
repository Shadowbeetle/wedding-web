'use strict'

module.exports = function setupServer (app) {
  return {
    _listening: false,

    listen (port) {
      this._listening = true

      return new Promise((resolve, reject) => {
        const previousServer = this._server

        this._server = app.listen(port, (err) => {
          if (err) return reject(err)
          return resolve()
        })

        // In order to catch errors we have to listen to error events on the returned httpServer
        this._server.on('error', (err) => {
          // If the port is in use by us than we restart the server
          if (err.code === 'EADDRINUSE' && err.port === port && this._listening) {
            return this._closeOld(previousServer)
              .then(() => {
                return this.listen(port)
              })
              .then(resolve)
              .catch(reject)
          } else {
            return reject(err)
          }
        })
      })
    },

    close () {
      return new Promise((resolve, reject) => {
        this._server.close((err) => {
          if (err) return reject(err)
          this._listening = false
          return resolve()
        })
      })
    },

    _closeOld (server) {
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) return reject(err)
          this._listening = false
          return resolve()
        })
      })
    }
  }
}
