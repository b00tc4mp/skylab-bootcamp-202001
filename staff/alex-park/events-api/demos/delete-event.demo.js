require('dotenv').config()

const { deleteEvent } = require('../logic')
const { database } = require('../data')
const { env: { MONGODB_URL } } = process

database.connect(MONGODB_URL)
.then(()=> {
    deleteEvent("5e5b98dce0c66931bc582bad", "5e5b9fdbe0c66931bc582bb1")
    .then(events => console.log(events))

})