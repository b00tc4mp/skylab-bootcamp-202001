const { validate } = require('../utils')
const { NotFoundError, NotAllowedError, ContentError } = require('../errors')
const { database, database: { ObjectId } } = require('../data')

module.exports = (id) => {
    validate.string(id, 'id')

    let _id

    try {
        _id = ObjectId(id)

    } catch ({ message }) {
        throw new ContentError(`invalid id in token: ${message}`)
    }

    const users = database.collection('users')

    return users.findOne({ _id })
        .then(user => {

            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            return users.updateOne({ _id }, { $set: { retrieved: new Date } })
                .then(() => {

                    const { name, surname, email } = user

                    return { name, surname, email }
                })
        })
}