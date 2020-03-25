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
        const { status, pushCombination } = game

        const playersStr = []
        game.players.forEach(player => playersStr.push(player.toString()))

        const watchingStr = []
        game.watching.forEach(watcher => watching.push(watcher.toString()))

        const currentPlayerStr = game.currentPlayer.toString()
    
        const timeNow = new Date()

        const elapsedTime = (timeNow - game.turnStart) / 1000

        let matched = true

        for (var i = 0; i < pushCombination.length; i++) {
            if(pushCombination[i] !== combination[i]) matched = false
        }
        
        /** when player before timeout matches the combination */
        if (elapsedTime < game.turnTimeout && matched) {
            const j = playersStr.indexOf(currentPlayerStr)
    
            for (var i = j; i < playersStr.length; i++) {
                if(!playersStr[j+1]) i = 0
                if(!watchingStr.includes(playersStr[i])) {
                    const combination = Math.floor(Math.random() * 4)
                    pushCombination.push(combination)
                    game.combinationViewed = []
                    game.turnTimeout = ((pushCombination.length) * 4)
                    game.turnStart = new Date()
                    game.currentPlayer = game.players[i]
                    return game
                }
            }
            /** when the player before timeout no match combination */
        } else if (elapsedTime < game.turnTimeout && !matched ) {
            game.watching.push(game.currentPlayer)
            watchingStr.push(currentPlayerStr)

            if(game.players.length === (game.watching.length -1)) return status = 'finished'

            var j = playersStr.indexOf(currentPlayerStr)
    
            for (var i = j; i < playersStr.length; i++) {
                if(!playersStr[j+1]) i = 0
                if(!watchingStr.includes(playersStr[i])) {
                    game.currentPlayer = game.players[i]
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