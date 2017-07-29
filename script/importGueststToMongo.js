const guests = require('../input/guestDB.json')
const Guest = require('../server/models/guest/guest')

Promise.all(guests.map((guest) => new Guest(guest).save()))
  .then(() => {
    console.log('guests saved to db')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
