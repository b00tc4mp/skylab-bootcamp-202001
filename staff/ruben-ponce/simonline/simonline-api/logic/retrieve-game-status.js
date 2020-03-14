const validate = require('simonline-utils/validate')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
var moment = require('moment')

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
        .then((game) => {
            debugger
            // var a = moment().format('LTS')
            // var b = moment().format('LTS')
            // var c = moment(a).fromNow()
            // var d = a.diff(b)
            let dateStarted = game.date
            let timeRemaining = game.timeRemaining
            let dateNow = new Date()

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)
            // on enter in game compo, countdown 15s (diference between date of started and Date.now of this retrieve)
            /* if "prestarted" & "timeremaining" < 1sec, change to "started" */
            // if "started" countdown Xsec to kick player or next player if pushed combination is ok

            if (game.status === "preStarted") {

                //condicional que a la diferencia entre dateStarted y datenow sea > 400sec...
                debugger
                let discountTimeRemaining = ((dateNow - dateStarted ) / 1000)
                
                let setTimeRemaining = timeRemaining - discountTimeRemaining //+-time

                game.timeRemaining = setTimeRemaining

                //como va ha haber muchas peticiones x sec, si la diferencia de la actual dateStarted entre la datenow de la peticion es > a 1 (1sec), debera setear la date started a la actual datenow, para evitar que la resta cada vez sea mayor
                if((dateStarted / 1000) - dateNow > 1) {
                    game.date = new Date()
                }
            }

            return game.save()
        })
        .then(game => {
            return game})
}
