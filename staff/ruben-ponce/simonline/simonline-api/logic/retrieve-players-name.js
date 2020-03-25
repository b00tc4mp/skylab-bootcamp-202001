const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')

/**
 * Retrieve players id and name
 * 
 * @param {string} id of game
 * 
 * @returns {Promise<Object>} Array of Objects
 */

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    let playersName = []

    return Game.findById(gameId)
    .populate('players', 'username id')
        .then(({players}) => {
            players.forEach(player => {
                playersName.push({username:player.username, id:player.id})
            })
            return playersName
        })
}