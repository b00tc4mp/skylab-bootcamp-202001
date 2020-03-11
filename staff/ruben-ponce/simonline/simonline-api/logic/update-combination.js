const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
const { random } = Math 

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    let combination = Math.floor(random() * 4)
    
    return Game.findById(gameId)
        .then((game) => {

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            game.combinationgame.push(combination)

            return game.save()
        })
        .then((game) => game)
}