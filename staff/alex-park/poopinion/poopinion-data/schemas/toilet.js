const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    place: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    rating: {
        cleanness: {
            type: [{ type: Number, required: true }]
        },
        looks: {
            type: [{ type: Number, required: true }]
        },
        multipleToilets: {
            type: [{ type: Boolean, required: true }]
        },
        paymentRequired: {
            type: [{ type: Boolean, required: true }]
        },
        paperDeployment: {
            type: [{ type: Boolean, required: true }]
        },
        overallRating: {
            type: [{ type: Number, required: true }]
        },
        image: { type: image }
    },
    geolocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
})