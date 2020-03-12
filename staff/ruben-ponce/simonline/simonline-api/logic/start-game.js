const { validate/*, shuffle */} = require('simonline-utils')
// import { shuffle } from '../../simonline-utils/shuffle'
const { models: { Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')
const { random } = Math 

module.exports = (gameId) => {
    validate.string(gameId, 'gameId')

    return Game.findById(gameId)
    .populate('players', 'username id')
        .then((game) => {
            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)
            if (game.status === "started") throw new NotAllowedError(`game with id ${gameId} is started`)
            
            let combination = Math.floor(random() * 4)
            
            if (typeof Array.prototype.shuffle === 'undefined')
                Array.prototype.shuffle = function() {
                for (var i = 0; i < this.length; i++) {
                    var randomIndex = Math.floor(Math.random() * this.length)
                    var currentValue = this[i]
                    this[i] = this[randomIndex]
                    this[randomIndex] = currentValue
                }
            }

            game.players.shuffle()
            game.combinationgame.push(combination)
            game.date = Date.now()
            game.currentplayer = game.players[0]//indice
            game.status = "started"
            return game.save()
        })
        .then(game => {
            return game})
}
