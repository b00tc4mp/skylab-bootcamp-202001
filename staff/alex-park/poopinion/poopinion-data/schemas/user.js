const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    deactivated: { type: Boolean, default: false },
    retrieved: { type: Date },
    favToilets: {
        type: [{ type: ObjectId, ref: 'Toilet' }]
    },
    comments: {
        type: [{ type: ObjectId, ref: 'Comment' }]
    },
    thumbsVotes: {
        type: [{ type: ObjectId, thumbs: Boolean, ref: 'Comment' }]
    },
    publishedToilets: {
        type: [{ type: ObjectId, ref: 'Toilet' }]
    }
})