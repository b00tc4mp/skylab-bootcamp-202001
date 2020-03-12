const {model, Schema } = require('mongoose')

const TicketSchema = new Schema({
    carPlate: {type: String, required: true, unique: true, trim: true},
    parkingName: {type: String, required: true},
    entryHour: {type: Date, required: true},
    exitHour: {type: Date},
    amount: {type: Number},
    validated: {type: Boolean, default: false}
})

module.exports = model('Ticket', TicketSchema)