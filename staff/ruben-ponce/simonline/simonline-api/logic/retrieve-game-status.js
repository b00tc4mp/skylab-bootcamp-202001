const validate = require('simonline-utils/validate')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
var moment = require('moment')

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
        .then((game) => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            let dateStarted = game.date
            let timeRemaining = game.timeRemaining
            let dateNow = new Date()

            /* 60sec countdown before start game */ /* OK */
            if (game.status === "preStarted" && ((dateNow - dateStarted) / 1000) > timeRemaining) {
                    game.status = "started"
                    game.date = new Date()
                    game.timeRemaining = 40 //Each turn time
            }

            /* 100sec countdown on turn */
            if(game.status === "started" && ((dateNow - dateStarted) / 1000) > timeRemaining) {
                game.watching.push(game.currentPlayer)
                var i = game.players.indexOf(game.currentPlayer)
                game.players.splice(i,1)
                game.currentPlayer = game.players[0]
                game.date = new Date()
            }

            return game.save()
        })
        .then(game => {
            return game})
}
