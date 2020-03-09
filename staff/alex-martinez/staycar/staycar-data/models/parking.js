const {Schema, model } = require('mongoose')

const ParkingSchema = new Schema({
    totalLots: {type : Number, required: true },
    occupiedLots: { type: Number, required: true }
})

module.exports = model('Parking', ParkingSchema)