const { Schema } = require('mongoose')
const Sessions = new Schema({ 
    time: { type: Number, required: true },
    lowTempP: { type: Array, required: true },
    hightTempP: { type: Array, required: true },
    batteryP: { type: Array, required: true },
    heightP: { type: Array, required: true },
    speedP: { type: Array, required: true },
    atmosPressureP: { type: Array, required: true },
    date: { type: Date, default: Date.now() }
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