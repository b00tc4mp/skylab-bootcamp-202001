const validate = require("simonline-utils/validate")
const { models: { Game } } = require("simonline-data")

/**
 * Play combination from flayer in game and match with game combination
 * 
 * @param {string} playerId unique user id
 * @param {Object} combination array sent of player in game
 * 
 * @returns {Promise<Object>} status game
 */

module.exports = (playerId, combination) => {
    validate.string(playerId, 'playerId')
    validate.type(combination, 'combination', Object)

    return Game.findOne({players: playerId}).lean()
    .then(game => {

        const playersStr = []
        game.players.forEach(player => playersStr.push(player.toString()))

        const watchingStr = []
        game.watching.forEach(watcher => watching.push(watcher.toString()))

        const currentPlayerStr = game.currentPlayer.toString()
    
        const timeNow = new Date()

        const elapsedTime = (timeNow - game.turnStart) / 1000

        let matched = true

        for (let i = 0; i < game.pushCombination.length; i++) {
            if(game.pushCombination[i] !== combination[i]) matched = false
        }

        const j = playersStr.indexOf(currentPlayerStr)

        let start;

        if(!playersStr[j+1]) {
            start = 0
        } else {
            start = j+1
        }
        
        /** when player before timeout matches the combination */
        if (elapsedTime < game.turnTimeout && matched) {
            /** [a,b,c] */
            for (let i = start; i < playersStr.length; i++) {
                if(!watchingStr.includes(playersStr[i])) {
                    const combination = Math.floor(Math.random() * 4)
                    game.pushCombination.push(combination)
                    game.combinationViewed = []
                    game.turnTimeout = (40 + (game.pushCombination.length * 4))
                    game.turnStart = new Date()
                    game.currentPlayer = game.players[i]
                    return game
                }
            }
            /** when the player before timeout no match combination */
        } else if (elapsedTime < game.turnTimeout && !matched ) {
            game.watching.push(game.currentPlayer)
            watchingStr.push(currentPlayerStr)

            if(game.players.length === (game.watching.length -1)) return game.status = 'finished'

            let j = playersStr.indexOf(currentPlayerStr)
    
            for (let i = start; i < playersStr.length; i++) {
                if(!watchingStr.includes(playersStr[i])) {
                    game.currentPlayer = game.players[i]
                    game.turnTimeout = (40 + (game.pushCombination.length * 4))
                    game.combinationViewed = []
                    game.turnStart = new Date()
                    return game
                }
            }
        } else {
            return game
        }
    })
    .then(game => game)
}