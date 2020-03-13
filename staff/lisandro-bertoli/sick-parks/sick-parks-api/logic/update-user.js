const { validate } = require('sick-parks-utils')
const { models: { User } } = require('sick-parks-data')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const bcrypt = require('bcryptjs')

module.exports = function (id, data) {
    validate.string(id, 'userId')
    validate.type(data, 'updates', Object)

    const { name, email, allowLocation, notifications, password, oldPassword } = data

    if (name !== undefined) {
        validate.string(name, 'name')
    }

    if (email !== undefined) {
        validate.string(email, 'email')
    }

    if (notifications !== undefined) {
        validate.type(notifications, 'notifications', Boolean)
    }

    if (allowLocation !== undefined) {
        validate.type(allowLocation, 'allowLocation', Boolean)
    }

    if (password !== undefined) {
        validate.string(password, 'password')
    }

    if (oldPassword !== undefined) {
        validate.string(oldPassword, 'oldPassword')
    }

    if (password && !oldPassword) throw new Error('oldPassword is not defined')
    if (!password && oldPassword) throw new Error('password is not defined')

    const keys = Object.keys(data)

    const VALID_KEYS = ['name', 'allowLocation', 'email', 'password', 'oldPassword', 'notifications']

    for (const key of keys)
        if (!VALID_KEYS.includes(key)) throw new NotAllowedError(`property ${key} is not allowed`)

    return (async () => {
        const _user = await User.findById(id)
        if (!_user) throw new NotFoundError(`user ${id} does not exist`)

        const verifiedPassword = await bcrypt.compare(oldPassword, _user.password)
        if (!verifiedPassword) throw new NotAllowedError('wrong credentials')

        data.password = await bcrypt.hash(password, 10)

        await User.findByIdAndUpdate(id, { $set: data })

        return
    })()
}