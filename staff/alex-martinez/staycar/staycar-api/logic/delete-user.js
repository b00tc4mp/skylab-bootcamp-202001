const { validate } = require('staycar-utils')
const { models: { User }} = require('staycar-data')
const { NotAllowedError } = require('staycar-errors')
const bcrypt = require('bcryptjs')

module.exports = (id, password) => {
    validate.string(id, 'id')
    validate.string(password, 'password')

    return (async() => {
        const user = await User.findById(id)
        if(!user) throw new NotAllowedError('do not have permission')

        const pass = await bcrypt.compare(password, user.password)
        if(!pass) throw new NotAllowedError('wrong credentials')

        return await User.findOneAndDelete(user.id)

    })()
}