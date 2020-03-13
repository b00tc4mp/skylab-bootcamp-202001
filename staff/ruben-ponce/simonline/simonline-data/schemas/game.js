const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: { type: String, required: true },
    players: [{ type: ObjectId, ref: 'User', required: true}],
    watching: [{ type: ObjectId, ref: 'User' }],
    currentPlayer: { type: ObjectId, ref: 'User' },
    combinationGame: [{ type: Object }],
    combinationPlayer: [{ type: Object }],
    owner: { type: String, required: true, ref: 'User'},
    status: { type: String, required: true, default: "waiting"},
    date: { type: String, required: true, default: Date.now() },
    timeRemaining: { type: Number }
})