const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { User } } = require('sick-parks-data')

module.exports = (id) => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {

            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ name, surname, email }) => ({ name, surname, email }))
}