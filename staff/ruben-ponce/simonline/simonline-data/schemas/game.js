const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    players: [{ type: ObjectId, ref: 'User', required: true}],
    watching: [{ type: ObjectId, ref: 'User' }],
    currentplayer: { type: String, ref: 'User' },
    combinationgame: [{ type: Object }],
    combinationplayer: [{ type: Object }],
    owner: { type: String, required: true, ref: 'User'},
    status: { type: String, required: true, default: "waiting"},
    date: { type: Date, required: true, default: Date.now }
})