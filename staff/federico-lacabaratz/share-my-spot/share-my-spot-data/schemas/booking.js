const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    listings: {
        type: [{ type: ObjectId, ref: 'Listing' }]
    },
    publisher: { type: ObjectId, required: true, ref: 'Listing' },
    userToBook: {
        type: [{ type: ObjectId, ref: 'User' }]
    },
    dateStarts: { type: Date, required: true },
    dateEnds: { type: Date, required: true },
    status: {type: String, default: 'red'},
})