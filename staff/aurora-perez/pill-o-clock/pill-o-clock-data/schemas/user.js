const { Schema, Types: { ObjectId } } = require('mongoose')
const drug = require('./drug')
const guideline = require('./guideline')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    profile: { type: String, required: true },
    patologies: { type: String },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    alarmSet: [{ type: Date }],
    medication: [drug],
    prescription: [guideline]
    
})