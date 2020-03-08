const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    drugName: { type: String, required: true },
    description: { type: String, required: true }
    
})