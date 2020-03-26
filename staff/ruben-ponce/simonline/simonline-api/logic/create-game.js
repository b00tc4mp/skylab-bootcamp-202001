const { validate } = require('simonline-utils')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError } = require('simonline-errors')

/**
 * Create game and save on database
 * 
 * @param {string} name
 * @param {string} owner 
 * 
 * @returns {Promise<empty>} empty promise
 * 
 * @throws {NotFoundError} when user create game no exist
 */

module.exports = (name, owner) => {
    validate.string(name, 'name')
    validate.string(owner, 'owner')

    return User.findById(owner)
        .then(user => {
            if(!user) throw new NotFoundError(`owner with id ${owner} does not exist`)

            const game = new Game({ name, owner, players: [owner] })

            return game.save()
        })
        .then (() => { })
}