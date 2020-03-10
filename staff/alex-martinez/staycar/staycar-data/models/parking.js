const {Schema, model } = require('mongoose')

const ParkingSchema = new Schema({
    totalLots: {type : Number, default: 0 },
    occupiedLots: { type: Number, default: 0 },
    parkingName: {type: String, required: true },
    lots: [{
        number: {
            type: Number
        },
        status: {
            type: Boolean
        }
    }]
})

module.exports = model('Parking', ParkingSchema)