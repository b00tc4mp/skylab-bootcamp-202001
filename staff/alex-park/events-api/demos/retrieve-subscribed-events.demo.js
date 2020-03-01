require('dotenv').config()

const { retrieveSubscribedEvents } = require('../logic')
const { database } = require('../data')
const { env: { MONGODB_URL } } = process

database.connect(MONGODB_URL)
.then(()=> {
    const users = database.collection('users')

    retrieveSubscribedEvents('5e5b98dce0c66931bc582bad')
    .then(events => console.log(events))

})