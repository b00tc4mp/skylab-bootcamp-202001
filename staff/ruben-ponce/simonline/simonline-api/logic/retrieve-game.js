const { models: { Game } } = require('simonline-data')
const { mongoose: { Types: { ObjectId } } } = require('simonline-data')

module.exports = (id) => {
    return Game.find({players: ObjectId(id)})
}