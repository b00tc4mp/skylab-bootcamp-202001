const { validate } = require('events-utils')
const { models: { User } } = require('events-data')
const { NotFoundError } = require('events-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            //user.retrieved = new Date

            return user.save()
        })
        .then(({ name, surname, username }) => ({ name, surname, username }))
}