const validate = require("simonline-utils/validate");
const { models: { User, Game } } = require("simonline-data");
const { NotFoundError } = require("simonline-errors");

module.exports = (playerId, combination) => {
    validate.string(playerId, 'playerId')
    validate.type(combination, 'combination', Object)

    return Game.find({players: ObjectId(playerId)})
        .then(game => {
            console.log(game)
        })

    // TODO when user plays on time (before timeout) and matches the combination, then game changes to next player
    /*
    - search the next player id in game.players that is not in game.watching (!game.watching.includes(id))
    - set next player id in game.currentPlayer (ObjectId)
    - reset game.turnStart
    - add new number to game.pushCombination
    - update game.turnTimeout proportionally to the number of game.pushCombination (40 + game.pushCombination.length)
    - reset game.combinationViewed = []
    */

    // TODO when user plays on time (before timeout) but does not match the combination, then game changes to next player, but this player is marked as watching now on
    /*
    - add playerId to game.watching
    - if (game.players.length === game.watching.length - 1) then game is over, otherwise:
    - search next player id in game.players
    - set next player id in game.currentPlayer
    - reset game.turnStart
    - reset game.combinationViewed = []
    */

    // TODO when user plays out of time (after timeout) whatever the combination
    /*
    - do nothing (return)
    */
}