const { validate } = require('simonline-utils')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

/**
 * Register and save user on database
 * 
 * @param {string} id unique user id
 * @param {string} gameId unique game id
 * 
 * @returns {Promise<empty>} empty promise
 * 
 * @throws {NotFoundError} when user id no exist
 * @throws {NotFoundError} when game id no exist
 * @throws {NotAllowedError} when player try to join game started
 */

module.exports = (id, gameId) => {
    validate.string(id, 'id')
    validate.string(gameId, 'gameId')

    return Promise.all([User.findById(id), Game.findById(gameId)])
        .then(([user, game]) => {
            
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            if (game.status === "started" || game.status === "finished") throw new NotAllowedError(`game of ${game.name} already start`)

            if (user.id !== game.owner && !(game.players.includes(user.id))) {
                game.players.push(user.id)
            }

            return Promise.all([game.save()])
        })
}