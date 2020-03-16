const validate = require("simonline-utils/validate")
const { models: { Game } } = require("simonline-data")

module.exports = (playerId, combination) => {
    validate.string(playerId, 'playerId')
    validate.type(combination, 'combination', Object)

    return Game.findOne({players: playerId})
    .then(game => {
        const { turnTimeout, players, watching, status, pushCombination} = game
    
        const timeNow = new Date()

        const elapsedTime = (timeNow - game.turnStart) / 1000
        debugger
        /** when player before timeout matches the combination */
        if (elapsedTime < turnTimeout && pushCombination === combination) {
            const j = players.indexOf(currentPlayer)
    
            for (var i = j; i < players.length; i++) {

                if(!players[j+1]) i = 0

                if(!watching.includes(players[i])) {

                    const combination = Math.floor(random() * 4)
                    pushCombination.push(combination)
                    game.combinationViewed = []
                    turnTimeout = ((pushCombination.length) * 4)
                    game.turnStart = new Date()
                    game.currentPlayer = players[i]
                    game.save()
                    return game
                }
            }
            /** when the player before timeout no match combination */
        } else if (elapsedTime < turnTimeout && pushCombination !== combination) {
            watching.push(game.currentPlayer)

            if(players.length === (watching.length -1)) return status = 'finished'

            var j = players.indexOf(game.currentPlayer)
    
            for (var i = j; i < players.length; i++) {

                if(!players[j+1]) i = 0

                if(!watching.includes(players[i])) {

                    game.currentPlayer = players[i]
                    game.combinationViewed = []
                    game.turnStart = new Date()
                    game.save()
                    return game
                }
            }
        } else {
            game.save()
            return game
        }
    })
    .then(game => game)
}