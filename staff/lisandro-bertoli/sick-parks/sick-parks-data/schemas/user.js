const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    image: { type: String },
    allowLocation: Boolean,
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    notifications: Boolean,
    parks: [{
        type: ObjectId,
        ref: 'Park'
    }],
    contributions: [{
        type: ObjectId,
        ref: 'Park'
    }],
    rejections: [{
        type: ObjectId,
        ref: 'Park'
    }],
    created: { type: Date, trim: true, default: Date.now },
    authenticated: Date
})