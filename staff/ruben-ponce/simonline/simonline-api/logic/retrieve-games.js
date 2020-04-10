const { models: { Game } } = require('simonline-data')

/**
 * Retrieve all games from database
 * 
 * @returns {Promise<Object>} Array of Objects with all games created
 */

module.exports = () => {
    return Game.find({'status' : 'waiting'})
        .then(game => {
            return game
        })
}