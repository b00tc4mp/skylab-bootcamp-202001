const validate = require("simonline-utils/validate")
const { models: { Game } } = require("simonline-data")

module.exports = (playerId, combination) => {
    validate.string(playerId, 'playerId')
    validate.type(combination, 'combination', Object)

    return Game.find({players: playerId})
        .then(game => {
            game.pushCombination = combination
            return game.save()
        })
        .then(game => {
            const { turnStart, turnTimeout, currentPlayer, players, watching, status, pushCombination, combinationViewed } = game
      
            const timeNow = new Date()
    
            const elapsedTime = (timeNow - turnStart) / 1000
            /** when player before timeout matches the combination */
            if (elapsedTime < turnTimeout && pushCombination === combination) {
                var j = players.indexOf(currentPlayer)
      
                for (var i = j; i < players.length; i++) {
                    if(!players[j+1]) i = 0
                    if(!watching.includes(players[i])) return currentPlayer = players[i]
                }

                const combination = Math.floor(random() * 4)
                pushCombination.push(combination)

                combinationViewed = []
                
                turnTimeout = ((pushCombination.length) * 4)
                
                turnStart = new Date()
                /** when the player before timeout no match combination */
            } else if (elapsedTime < turnTimeout && pushCombination !== combination) {
                watching.push(currentPlayer)

                if(players.length === (watching.length -1)) return status = 'finished'

                var j = players.indexOf(currentPlayer)
      
                for (var i = j; i < players.length; i++) {
                    if(!players[j+1]) i = 0;
                    if(!watching.includes(players[i])) return currentPlayer = players[i]
                }

                combinationViewed = []
                
                turnStart = new Date()
            } else {
                return
            }
        })
}