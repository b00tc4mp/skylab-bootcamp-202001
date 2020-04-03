const { validate, semaphore } = require("simonline-utils")
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

  return new Promise((resolve, reject) => {
    semaphore(gameId, semaphore => {
      semaphore.setRed()

      User.findById(playerId)
        .then(user => {
          if (!user)
            throw new NotFoundError(`player with id ${playerId} not found`)
        })
        .then(() => Game.findById(gameId))
        .then(game => {
          if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

          const { status, turnTimeout } = game

          if (game.players.every(player => player.toString() !== playerId))
            throw new NotFoundError(`player ${playerId}, not joined on game`)

          if (status === "started") {

            const { turnStart } = game

            const timeNow = new Date()

            const elapsedTime = (timeNow - turnStart) / 1000

            /* when has passed countdown on turn */
            if (elapsedTime > turnTimeout) {
              game.turnStart = timeNow

              const playerNotWatching = playerId =>
                game.watching.every(player => player.toString() !== playerId.toString())

              const { currentPlayer } = game

              game.watching.push(currentPlayer)

              const currentPlayerIndex = game.players.indexOf(currentPlayer)

              for (let i = currentPlayerIndex + 1; i < game.players.length && game.currentPlayer.toString() === currentPlayer.toString(); i++) {
                const potentialNextPlayer = game.players[i]

                if (playerNotWatching(potentialNextPlayer)) {
                  game.currentPlayer = potentialNextPlayer
                }
              }

              for (let i = 0; i < currentPlayerIndex && game.currentPlayer.toString() === currentPlayer.toString(); i++) {
                const potentialNextPlayer = game.players[i]

                if (playerNotWatching(potentialNextPlayer)) {
                  game.currentPlayer = potentialNextPlayer
                }
              }

              if (game.currentPlayer.toString() === currentPlayer.toString() || game.players.length === game.watching.length + 1) {
                game.status = "finished"
              }

              return game.save()
            }
          }
          return game
        })
        .then(game => {
          semaphore.setGreen()

          resolve(game)
        })
        .catch(reject)
    })
  })
}

