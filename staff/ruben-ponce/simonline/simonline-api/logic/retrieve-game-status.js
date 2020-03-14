const validate = require("simonline-utils/validate");
const {
  models: { User, Game }
} = require("simonline-data");
const { NotFoundError, NotAllowedError } = require("simonline-errors");
var moment = require("moment");

module.exports = (playerId, gameId) => {
  validate.string(playerId, "playerId");
  validate.string(gameId, "gameId");

  // TODO User.findById(playerId) => check the user exists

  return Game.findById(gameId)
    .then(game => {
      if (!game) throw new NotFoundError(`game with id ${gameId} not found`);

      // TODO check user is inside this game (that means checking this userId is inside game.players, otherwise throw error)

      const { status } = game;

      if (status === "started") {
        const { turnStart, turnTimeout } = game;

        const timeNow = new Date();

        const elapsedTime = (timeNow - turnStart) / 1000;

        /* 40sec countdown on turn */
        if (elpasedTime > turnTimeout) {
          game.watching.push(game.currentPlayer);
          //var i = game.players.indexOf(game.currentPlayer)
          //game.players.splice(i,1)

          // TODO check if (game.watching === game.players.length - 1) then status = 'finished'
          // TODO search next player in game.players and then set its id here
          game.currentPlayer = game.players[0];
          // REDO
          game.turnStart = new Date();

          /* Matching betwen combinationPlayer and combinationGame */
          return game.save();
        }
      }

      return game;
    })
    .then(game => game);
};
