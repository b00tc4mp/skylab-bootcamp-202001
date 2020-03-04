const { model, Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = model('Event', new Schema(
    {
        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true,
        },
        publisher: {
            type: ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        }
    })
)

