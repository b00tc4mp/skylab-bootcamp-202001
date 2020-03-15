const { Schema } = require('mongoose')

module.exports = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        indes: { type: '2dsphere', sparse: false },
        required: true
    }
})