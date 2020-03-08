const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    allowLocation: Boolean,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    parks: [{ type: ObjectId, ref: 'Park' }],
    notifications: Boolean,
    contributions: Array,
    rejections: Array,
    created: Date,
    authenticated: Date
})