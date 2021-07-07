require('dotenv').config()
const { subscribeEvent } = require('../logic')
const { database, models: { User, Event } } = require('../data')
const { env: { MONGODB_URL } } = process
const { random } = Math

database.connect(MONGODB_URL)
.then(() => {
    return subscribeEvent('5e5aa8e53dd2ea2b2c98ee39', '5e5aaa573dd2ea2b2c98ee3c')
        .then(result => console.log(result))
})