const {Schema, model } = require('mongoose')

const ParkingSchema = new Schema({
    totalLots: {type : Number, default: 0 },
    occupiedLots: { type: Number }
})

module.exports = model('Parking', ParkingSchema)