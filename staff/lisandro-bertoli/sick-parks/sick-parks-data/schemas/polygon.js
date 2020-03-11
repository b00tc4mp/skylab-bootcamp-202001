const { Schema } = require('mongoose')

module.exports = new Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        index: { type: '2dsphere', sparse: false },
        required: true
    }
}, { _id: false })