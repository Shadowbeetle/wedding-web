'use strict'
const server = require('./server')
const port = process.env.PORT || 8888

server.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('server is listening on port', port)
})
