const { models: { Game } } = require('simonline-data')
const { mongoose: { Types: { ObjectId } } } = require('simonline-data')

module.exports = () => {
    return Game.find({})
        .then(event => {
            return event
        })
}