const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    age: { type: Number, required: true },
    patologies: { type: String, required: true },
    profile: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    retrieved: { type: Date },
    alarmSet: [{ type: Date }],
    medication: {
        type: [{ type: ObjectId, ref: 'Drug' }]
    },
    receipt: {
        type: [{ type: ObjectId, ref: 'Guideline' }]
    }
    
})