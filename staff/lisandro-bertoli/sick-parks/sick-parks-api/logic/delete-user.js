const { validate } = require('sick-parks-utils')
const { models: { User } } = require('sick-parks-data')
const bcrypt = require('bcryptjs')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')

module.exports = ({ _id, password }) => {
    validate.string(_id, 'userId')
    validate.string(password, 'password')

    return (async () => {
        const user = await User.findById(_id)

        if (!user) throw new NotFoundError(`user with id ${_id} does not exist`)

        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            await User.deleteOne({ _id })
            return
        }

        throw new NotAllowedError('incorrect password')
    })()
}