const { Schema } = require('mongoose')
const Sessions = new Schema({ 
    date: { type: Date, default: Date.now() },
    height: { type: String, required: true },
    speed: { type: String, required: true },
    time: { type: String, required: true },
    temperature: { type: String, required: true }
})

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    sessions: [Sessions]
},
{versionKey: false})