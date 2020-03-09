const {mongoose, Schema } = require('mongoose')

const TicketSchema = new Schema({
    //plate_number: {type: String, required: true, unique: true, trim: true},
    //date: {type: Date, required: true},
    entry_hour: {type: Date, required: true},
    exit_hour: {type: Date},
    amount: {type: Number},
    validate: {type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Ticket', TicketSchema)