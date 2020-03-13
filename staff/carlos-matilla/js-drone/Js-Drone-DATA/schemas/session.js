const { Schema, Types: { ObjectId } } = require('mongoose')


module.exports = new Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: Date.now() },
    height: { type: String, required: true },
    speed: { type: String, required: true },
    time: { type: String, required: true },
    temperature: { type: String, required: true },
},
{versionKey: false})