const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (combination, gameId) => {
    validate.type(combination, 'combination', Number)
    validate.string(gameId, 'gameId')
    debugger
    return Game.findById(gameId)
        .then((game) => {

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            game.combinationgame.push(combination)

            return game.save()
        })
        .then((game) => game)
}