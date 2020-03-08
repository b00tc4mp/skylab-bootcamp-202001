const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    name: { type: String, required: true },
    size: {
        type: String,
        required: true,
        enum: ['s', 'm', 'l', 'xl']
    },
    flow: { type: String, default: 'N/A' },
    level: {
        type: String,
        required: true,
        enum: ['begginer', 'intermediate', 'advanced', 'ripper']
    },
    resort: String,
    location: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
        },
        coordinates: {
            type: [[[Number]]],
            required: true
        }
    },
    image: String,
    features: [{ type: ObjectId, ref: 'Feature' }],
    description: String,
    creator: { type: ObjectId, ref: 'User' },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    created: { type: Date, default: Date.now },
    modified: Date,
    verified: Boolean
}) 