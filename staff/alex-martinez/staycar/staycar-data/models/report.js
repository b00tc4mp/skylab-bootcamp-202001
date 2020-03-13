const {model, Schema } = require('mongoose')

const ReportSchema = new Schema({
    ticketId: {type: String, required: true},
    carPlate: {type: String, required: true},
    ticketAmount: {type: Number, required: true}
})

module.exports = model('Report', ReportSchema)