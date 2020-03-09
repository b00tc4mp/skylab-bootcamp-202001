const {model, Schema } = require('mongoose')

const TicketSchema = new Schema({
    carPlate: {type: String, required: true, unique: true, trim: true},
    //date: {type: Date, required: true},
    entryHour: {type: Date, required: true},
    exitHour: {type: Date},
    amount: {type: Number},
    validated: {type: Boolean, required: true, default: false}
})

module.exports = model('Ticket', TicketSchema)