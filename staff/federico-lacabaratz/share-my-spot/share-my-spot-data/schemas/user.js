const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    created: { type: Date, required: true, default: Date.now },
    authenticated: { type: Date },
    favs: { type: [{ type: ObjectId, ref: 'User'}]},
    publishedListings: {
        type: [{ type: [ObjectId], ref: 'Listing' }]
    },
    subscribedToListing: {
        type:
            [{ type: [ObjectId], ref: 'Listing' }]
    }
})