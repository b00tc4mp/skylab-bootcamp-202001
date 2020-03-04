const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    created: { type: Date, required: true, trim: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    publishedEvents: [{
        type: ObjectId,
        ref: 'Event'
    }],
    subscribedEvents: [{
        type: ObjectId,
        ref: 'Event'
    }]
})
