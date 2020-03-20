const { validate } = require('simonline-utils')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (name, owner ) => {
    debugger
    validate.string(name, 'name')
    validate.string(owner, 'owner')

    return User.findById(owner)
        .then(user => {
            if(!user) throw new NotFoundError(`owner with id ${owner} does not exist`)

            const game = new Game({ name, owner, players: [owner] })

            return game.save()
        })
        .then (() => { })
}