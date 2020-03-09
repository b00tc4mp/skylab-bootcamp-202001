const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    players: [{ type: ObjectId, ref: 'User' }],
    ingame: [{ type: ObjectId, ref: 'User' }],
    watching: [{ type: ObjectId, ref: 'User' }],
    currentplayer: { type: String, ref: 'User' },
    combinationgame: [{ type: Object }],
    combinationplayer: [{ type: Object }],
    owner: { type: String, required: true, ref: 'User'}
    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // date: { type: Date, required: true },
    // location: { type: String, required: true },
    // publisher: { type: ObjectId, required: true, ref: 'User' },
    // created: { type: Date, required: true, default: Date.now },
    // subscribed: [{ type: ObjectId, ref: 'User' }]
})