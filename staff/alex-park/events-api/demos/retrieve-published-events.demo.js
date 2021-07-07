require('dotenv').config()
const { retrievePublishedEvents } = require('../logic')
const { database, models: { User, Event } } = require('../data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

database.connect(TEST_MONGODB_URL)
.then(() => {
    return retrievePublishedEvents("5e5a6f6f6e23322660f0dcb5")
        .then(result => console.log(result))
})