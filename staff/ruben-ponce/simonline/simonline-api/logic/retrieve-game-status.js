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
      
            if(!game.players.includes(playerId)) throw new NotFoundError(`player ${playerId}, not joined on game`)
      
            const { status } = game
      
            if (status === "started") {
              const { turnStart, turnTimeout, currentPlayer, players, watching, status } = game
      
              const timeNow = new Date()
      
              const elapsedTime = (timeNow - turnStart) / 1000
      
              /* 40sec countdown on turn */
              if (elapsedTime > turnTimeout) {
                watching.push(currentPlayer)
                var j = players.indexOf(currentPlayer)
      
                if(players.length === (watching.length -1)) return status = 'finished'

                for (var i = j; i < players.length; i++) {
                    if(!players[j+1]) i = 0
                    if(!watching.includes(players[i])) return currentPlayer = players[i]
                }

                turnStart = new Date()
      
                /* Matching betwen combinationPlayer and combinationGame */
                return game.save()
              }
            }
            return game
          })
          .then(game => game)
    })
};
