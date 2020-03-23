const { validate } = require('simonline-utils')
const { models: { Game } } = require('simonline-data')

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