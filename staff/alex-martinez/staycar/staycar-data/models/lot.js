const {Schema, model } = require('mongoose')

const LotSchema = new Schema({
    plateNumber: {type : String, required: true, trim: true, unique: true},
    occupied: { type: Boolean, required: true, default: false}
})

module.exports = model('Lot', LotSchema)