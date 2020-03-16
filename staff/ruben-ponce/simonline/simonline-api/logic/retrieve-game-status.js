const validate = require("simonline-utils/validate")
const { models: { User, Game } } = require("simonline-data")
const { NotFoundError } = require("simonline-errors")

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
            
            const { status, turnTimeout, players, watching } = game

            if(!players.includes(playerId)) throw new NotFoundError(`player ${playerId}, not joined on game`)
      
            if (status === "started") {
      
              const timeNow = new Date()
      
              const elapsedTime = (timeNow - game.turnStart) / 1000
              debugger
              /* 40sec countdown on turn */
              if (elapsedTime > turnTimeout) {
                watching.push(game.currentPlayer)
                const j = players.indexOf(game.currentPlayer)
      
                if(players.length === (watching.length -1)) return status = 'finished'

                for (let i = j; i < players.length; i++) {
                    if(!players[j+1]) i = 0
                    if(!watching.includes(players[i])) game.currentPlayer = players[i]
                }
                debugger
                game.turnStart = new Date()
      
                /* Matching betwen combinationPlayer and combinationGame */
                game.save()
                return game
              }
            }
            return game
          })
          .then(game => game)
    })
};
