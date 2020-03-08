const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    publisher: { type: ObjectId, required: true, ref: 'User' },
    created: { type: Date, required: true, default: Date.now },
    commentedAt: { type: ObjectId, required: true, ref: 'Toilet' },
    rating: {
        cleanness: {
            type: { type: Number, required: true }
        },
        looks: {
            type: { type: Number, required: true }
        },
        multipleToilets: {
            type: { type: Boolean, required: true }
        },
        paymentRequired: {
            type: { type: Boolean, required: true }
        },
        paperDeployment: {
            type: { type: Boolean, required: true }
        },
        overallRating: {
            type: { type: Number, required: true }
        },
        textArea: { type: String }
    },
    thumbsUp: { type: Number },
    thumbsDown: { type: Number }
})