const {mongoose, Schema } = require('mongoose')

const LotSchema = new Schema({
    plate_number: {type : String, required: true, trim: true, unique: true},
    occupied: { type: Boolean, required: true, default: false}
})

module.exports = mongoose.model('Lot', LotSchema)