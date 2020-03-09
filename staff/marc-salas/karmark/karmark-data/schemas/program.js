const {Schema, Types: {ObjectId}} = require ('mongoose')

module.exports = new Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    author: {
        type: [{ type: ObjectId, ref: 'User'}]
    },
    code: {
        type:{
            name: {type: String},
            directions: {type: Array}
        }
    }
})