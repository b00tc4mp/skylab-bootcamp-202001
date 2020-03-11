const { validate } = require('simonline-utils')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (id, gameId) => {
    validate.string(id, 'id')
    validate.string(gameId, 'gameId')

    let playersName = []

    return Promise.all([User.findById(id), Game.findById(gameId)])
        .then(([user, game]) => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

            // if (game.players.includes(user.id)) throw new NotAllowedError(`user with id ${id} already subscribed to this game`)

            game.players.push(user.id)

            return Promise.all([game.save()])
        })
        .then(() => { 
            return Game.findById(gameId)
            .populate('players', 'username')
                .then(({players}) => {
                    debugger
                    players.forEach(player => {
                        playersName.push(player.username)
                    })
                    return playersName
                })
         })
}