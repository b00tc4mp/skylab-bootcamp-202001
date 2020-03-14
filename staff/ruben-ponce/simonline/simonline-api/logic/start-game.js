const validate = require('simonline-utils/validate')
require('../../simonline-utils/shuffle')()
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
const { random } = Math 

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
    .populate('players', 'username id')
        .then((game) => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            if (game.status === "started" || game.status === "preStarted") throw new NotAllowedError(`game with id ${gameId} is started`)
            
            let combination = Math.floor(random() * 4)
            
            game.players.shuffle()
            game.combinationGame.push(combination)
            game.date = new Date()
            game.currentPlayer = game.players[0]//indice
            game.status = "preStarted"
            game.timeRemaining = 400
            return game.save()
        })
        .then(game => {
            return game})
}
