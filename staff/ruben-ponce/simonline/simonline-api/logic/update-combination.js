const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')
const { NotFoundError } = require('simonline-errors')
const { random } = Math 

/**
 * Update combination game with random num between 0 and 3
 * 
 * @param {string} id of game
 * 
 * @returns {Promise<Object>} game status
 * 
 * @throws {NotFoundError} when not found game
 * 
 */

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    const combination = Math.floor(random() * 4)
    
    return Game.findById(gameId)
        .then((game) => {

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            game.pushCombination.push(combination)

            return game.save()
        })
        .then((game) => game)
}