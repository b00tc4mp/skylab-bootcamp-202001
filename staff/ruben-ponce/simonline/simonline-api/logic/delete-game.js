const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')
const { NotFoundError } = require('simonline-errors')

/**
 * Delete game from database
 * 
 * @param {string} gameId
 * 
 * @returns {Promise<empty>} empty promise
 * 
 * @throws {NotFoundError} when not found gameId
 */

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
        .then(game => {
            if(!game) throw new NotFoundError(`game with id ${gameId} does not exist`)
        })
        .then (() => { 
            return Game.deleteOne({ _id: gameId })
        })
        .then (() => { })
}