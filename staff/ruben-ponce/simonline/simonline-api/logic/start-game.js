const validate = require('simonline-utils/validate')
require('../../simonline-utils/shuffle')()
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
const { random } = Math 

/**
 * Start game
 * 
 * @param {string} id of player
 * @param {string} id of game
 * 
 * @returns {Promise<empty>} empty promise
 * 
 * @throws {NotFoundError} when not found game
 * @throws {NotAllowedError} when not the owner try start game
 * @throws {NotAllowedError} when owner try start game again
 * 
 */

module.exports = (playerId, gameId) => {
    validate.string(playerId, 'playerId')
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
    .populate('players', 'username id')
        .then((game) => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            if(!game.owner === playerId) throw new NotAllowedError(`only the owner ${playerId} can start game`)

            if (game.status === "started") throw new NotAllowedError(`game with id ${gameId} is started`)
            
            const combination = Math.floor(random() * 4)
            
            game.date = new Date()
            game.players.shuffle()
            game.pushCombination.push(combination)
            game.turnStart = new Date()
            game.currentPlayer = game.players[0]
            game.status = "started"
            game.turnTimeout = 40

            return game.save()
        })
        .then(() => {})
}
