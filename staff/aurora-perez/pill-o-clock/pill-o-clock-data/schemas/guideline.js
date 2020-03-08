const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    created: { type: Date, required: true, default: Date.now },
    recepted: {
        type: [{ type: ObjectId, ref: 'User' }]
    },
    recepted: {
        type: [
            {
                drug: { type: ObjectId, ref: 'User' },
                times: [ {time: Date} ] 
            }
        ]
    }
    
})