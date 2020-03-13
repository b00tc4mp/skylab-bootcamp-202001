const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    sessions: {
        type: [{ type: ObjectId, ref: 'Session' }]
    }
},
{versionKey: false})