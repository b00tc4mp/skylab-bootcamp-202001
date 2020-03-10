const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    created: { type: Date, required: true, default: Date.now },
    prescribed: { type: ObjectId, ref: 'User' },
    schedule: {
        type: [
            {
                drug: { type: ObjectId, ref: 'User' },
                times: [ {type: Date} ] 
            }
        ]
    }
    
})