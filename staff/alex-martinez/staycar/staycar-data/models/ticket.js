const {model, Schema } = require('mongoose')

const TicketSchema = new Schema({
    car_plate: {type: String, required: true, unique: true, trim: true},
    //date: {type: Date, required: true},
    entry_hour: {type: Date, required: true},
    exit_hour: {type: Date},
    amount: {type: Number},
    validated: {type: Boolean, required: true, default: false}
})

module.exports = model('Ticket', TicketSchema)