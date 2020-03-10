const { validate } = require('simonline-utils')
const { models: { User, Game } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (name, owner ) => {
    validate.string(name, 'name')
    validate.string(owner, 'owner')

    let id, _user

    return User.findOne({username:owner})
        .then(user => {
            if(!user) throw new NotFoundError(`owner with username ${owner} does not exist`)
            id = user.id
            _user = user
        })
        .then(() => {
            let game = new Game({ name, owner })
            id = game.id
            return game.save()
                .then(() =>{
                    return Game.findByIdAndUpdate(id, { $addToSet: {players: _user.id}})
                })
        })
        .then (() => { })
}