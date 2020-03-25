const validate = require("simonline-utils/validate")
const { models: { User, Game } } = require("simonline-data")
const { NotFoundError } = require("simonline-errors")

/**
 * Retrieve game status from database
 * 
 * @param {string} playerId unique user id
 * @param {string} id of game
 * 
 * @returns {Promise<Object>} status of game
 * 
 * @throws {NotFoundError} when not found player
 * @throws {NotFoundError} when not found game
 * @throws {NotFoundError} when player not joined on this game
 */

module.exports = (playerId, gameId) => {
  validate.string(playerId, "playerId")
  validate.string(gameId, "gameId")

  return User.findById(playerId)
    .then(user => {
        if(!user) throw new NotFoundError(`player with id ${playerId} not found`)
    })
    .then(() => {
        return Game.findById(gameId)
          .then(game => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)
            
            const { status, turnTimeout } = game

            if(!game.players.includes(playerId)) throw new NotFoundError(`player ${playerId}, not joined on game`)
      
            if (status === "started") {
      
              const timeNow = new Date()
      
              const elapsedTime = (timeNow - game.turnStart) / 1000
              
              /* 40sec countdown on turn */
              if (elapsedTime > turnTimeout) {
                game.watching.push(game.currentPlayer)
                const j = game.players.indexOf(game.currentPlayer)
      
                if (game.players.length === (game.watching.length + 1)) {
                  //change winner player to current player
                  for (let i = j; i < game.players.length; i++) {
                    if(!game.players[j+1]) i = 0
                    if(!game.watching.includes(game.players[i])) {
                      game.currentPlayer = game.players[i]
                      game.status = 'finished'
                      game.save()
                      return game
                    }
                  }
                }

                for (let i = j; i < game.players.length; i++) {
                    if(!game.players[j+1]) i = 0
                    if(!game.watching.includes(game.players[i])) {
                      game.currentPlayer = game.players[i]
                      game.turnStart = new Date()
                      game.save()
                      return game
                    }
                }
                /* Matching betwen combinationPlayer and combinationGame */
              }
            }
            return game
          })
          .then(game => game)
    })
}
