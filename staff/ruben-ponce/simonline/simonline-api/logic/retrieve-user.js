const { validate } = require('simonline-utils')
const { models: { User } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ username }) => ({ username }))
}