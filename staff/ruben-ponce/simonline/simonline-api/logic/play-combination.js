const validate = require("simonline-utils/validate")
const { models: { Game } } = require("simonline-data")

/**
 * Play combination from flayer in game and match with game combination
 * 
 * @param {string} gameId unique game id
 * @param {Object} combination array sent of player in game
 * 
 * @returns {Promise<Object>} status game
 */

module.exports = (gameId, combination) => {
    validate.string(gameId, 'gameId')
    validate.type(combination, 'combination', Object)
    
    return Game.findById(gameId).lean()
    .then(game => {
        const playersStr = []
        game.players.forEach(player => playersStr.push(player.toString()))

        const watchingStr = []
        if (game.watching) {
            game.watching.forEach(watcher => watchingStr.push(watcher.toString()))
        }

        const currentPlayerStr = game.currentPlayer.toString()
    
        const timeNow = new Date()

        const elapsedTime = (timeNow - game.turnStart) / 1000

        let matched = true

        for (let i = 0; i < game.pushCombination.length; i++) {
            if(game.pushCombination[i] !== combination[i]) matched = false
        }

        let j = playersStr.indexOf(currentPlayerStr)
        
        if (elapsedTime < game.turnTimeout && matched) {
            for (let i = j; i < playersStr.length; i++) {
                if(!watchingStr.includes(playersStr[i]) && currentPlayerStr !== playersStr[i]) {
                    const newPushCombination = Math.floor(Math.random() * 4)
                    game.pushCombination.push(newPushCombination)
                    game.combinationViewed = []
                    game.turnTimeout = (20 + (game.pushCombination.length * 4))
                    game.turnStart = new Date()
                    game.currentPlayer = game.players[i]

                    return Game.findByIdAndUpdate(gameId, game)
                    .then(()=> game)
                }
                if(!playersStr[i+1]) i = -1
            }
        } else if (elapsedTime < game.turnTimeout && !matched ) {
            game.watching.push(game.currentPlayer)
            watchingStr.push(currentPlayerStr)
            
            if(game.players.length === (game.watching.length + 1)) {
                 /* change winner player to current player */
                 for (let i = j; i < game.players.length; i++) {
                    if(!watchingStr.includes(playersStr[i])) {
                        game.currentPlayer = game.players[i]
                        game.status = 'finished'

                        return Game.findByIdAndUpdate(gameId, game)
                            .then(()=> game)
                    }
                    if(!playersStr[i+1]) i = -1
                }
            }
                    
            for (let i = j; i < playersStr.length; i++) {
                if(!watchingStr.includes(playersStr[i]) && currentPlayerStr !== playersStr[i]) {
                    game.currentPlayer = game.players[i]
                    game.turnTimeout = (20 + (game.pushCombination.length * 4))
                    game.combinationViewed = []
                    game.turnStart = new Date()

                    return Game.findByIdAndUpdate(gameId, game)
                    .then(()=> game)
                }
                if(!playersStr[i+1]) i = -1
            }
        } else {
            console.log('else===>', game)
            return game
        }
    })
    .then(game => game)
}