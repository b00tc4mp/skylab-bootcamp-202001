const validate = require('simonline-utils/validate')
require('../../simonline-utils/shuffle')()
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
const { random } = Math 

module.exports = (playerId, gameId) => {
    validate.string(playerId, 'playerId')
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
    .populate('players', 'username id')
        .then((game) => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            if(!game.owner.includes(playerId)) throw new NotAllowedError(`only the owner ${playerId} can start game`)

            if (game.status === "started") throw new NotAllowedError(`game with id ${gameId} is started`)
            
            const combination = Math.floor(random() * 4)
            
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
