const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User, Session } } = require('./../../Js-Drone-DATA')
const { NotFoundError, NotAllowedError } = require('./../../Js-Drone-ERRORS')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            return user.save()
        })
        .then(({ name, surname, username}) => ({ name, surname, username}))
}