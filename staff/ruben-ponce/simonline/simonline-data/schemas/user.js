const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})