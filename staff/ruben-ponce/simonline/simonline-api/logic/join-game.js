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

            // if (game.players.includes(user.id) && user.id !== game.owner) throw new NotAllowedError(`user with id ${id} already subscribed to this game`)

            if (game.status === "started") throw new NotAllowedError(`game of ${game.name} already start`)

            if (user.id !== game.owner && !(game.players.includes(user.id))) {
                game.players.push(user.id)
            }

            return Promise.all([game.save()])
        })
        .then(() => { 
            return Game.findById(gameId)
            .populate('players', 'username id')
                .then(({players}) => {
                    players.forEach(player => {
                        playersName.push({username:player.username, id:player.id})
                    })
                    return playersName
                })
         })
}