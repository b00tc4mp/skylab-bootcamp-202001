const {mongoose, Schema } = require('mongoose')

const ParkingSchema = new Schema({
    plates_total: {type : Number, required: true },
    plates_occupied: { type: Number, required: true }
})

module.exports = mongoose.model('Parking', ParkingSchema)