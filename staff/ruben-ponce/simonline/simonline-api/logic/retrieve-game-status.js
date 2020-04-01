const { validate } = require("simonline-utils");
const { models: { User, Game } } = require("simonline-data");
const { NotFoundError } = require("simonline-errors");

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
  validate.string(playerId, "playerId");
  validate.string(gameId, "gameId");

  console.log('retrieve game status', 1)

  return User.findById(playerId)
    .then(user => {
      if (!user)
        throw new NotFoundError(`player with id ${playerId} not found`);

      console.log('retrieve game status', 2)
    })
    .then(() => {
      return Game.findById(gameId)
    })
    .then(game => {
      if (!game) throw new NotFoundError(`game with id ${gameId} not found`);

      console.log('retrieve game status', 3)

      const { status, turnTimeout } = game;
      if (game.players.every(player => player.toString() !== playerId))
        throw new NotFoundError(`player ${playerId}, not joined on game`);

      console.log('retrieve game status', 4)

      if (status === "started") {

        console.log('retrieve game status', 5)

        const { turnStart } = game

        const timeNow = new Date();

        const elapsedTime = (timeNow - turnStart) / 1000;

        console.log(playerId, gameId, timeNow, turnStart, elapsedTime, turnTimeout)

        /* when has passed countdown on turn */
        if (elapsedTime > turnTimeout) {
          game.turnStart = timeNow;

          console.log('retrieve game status', 6)

          const playerNotWatching = playerId =>
            game.watching.every( player => player.toString() !== playerId.toString());

          const { currentPlayer } = game;

          game.watching.push(currentPlayer);

          const currentPlayerIndex = game.players.indexOf(currentPlayer);

          for ( let i = currentPlayerIndex + 1; i < game.players.length && game.currentPlayer.toString() === currentPlayer.toString(); i++ ) {
            const potentialNextPlayer = game.players[i];

            if (playerNotWatching(potentialNextPlayer)) {
              game.currentPlayer = potentialNextPlayer;
            }
          }

          for (let i = 0; i < currentPlayerIndex && game.currentPlayer.toString() === currentPlayer.toString(); i++) {
            const potentialNextPlayer = game.players[i];

            if (playerNotWatching(potentialNextPlayer)) {
              game.currentPlayer = potentialNextPlayer;
            }
          }

          if (game.currentPlayer.toString() === currentPlayer.toString())
            game.status = "finished";

          return game.save();
        }
      }
      return game;
    });
}

