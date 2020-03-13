const validate = require('simonline-utils/validate')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')


    return Game.findById(gameId)
        .then((game) => {
            debugger
            let timeRemaining = game.timeRemaining
            let dateStarted = game.date
            let dateNow = Date.now()

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)
            // on enter in game compo, countdown 15s (diference between date of started and Date.now of this retrieve)
            /* if "prestarted" & "timeremaining" < 1sec, change to "started" */
            // if "started" countdown Xsec to kick player or next player if pushed combination is ok

            if (game.status === "preStarted") {

                let discountTimeRemaining = ((dateStarted - dateNow) / 1000)
                debugger
                let setTimeRemaining = timeRemaining + discountTimeRemaining //+-time

                game.timeRemaining = setTimeRemaining
            }

            return game.save()
        })
        .then(game => {
            return game})
}
