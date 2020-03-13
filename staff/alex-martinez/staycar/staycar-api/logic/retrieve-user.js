const { validate } = require('staycar-utils')
const { models: { User } } = require('staycar-data')
const { NotFoundError, NotAllowedError } = require('staycar-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            return user.save()
        })
        .then(({ id, name, surname, username }) => ({ id, name, surname, username }))
}