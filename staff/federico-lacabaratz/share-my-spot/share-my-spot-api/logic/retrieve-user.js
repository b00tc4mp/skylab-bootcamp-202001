const { validate } = require('share-my-spot-utils')
const { models: { User } } = require('share-my-spot-data')
const { NotAllowedError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date()

            user.id = user._id.toString()
            delete user._id
            delete user.__v

            return user.save()
        })
        .then(({ id, name, surname, email, phone }) => ({ id, name, surname, email, phone }))
}