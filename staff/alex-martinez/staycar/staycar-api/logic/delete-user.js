const { validate } = require('staycar-utils')
const { models: { User }} = require('staycar-data')
const { NotAllowedError } = require('staycar-errors')
const bcrypt = require('bcryptjs')

module.exports = (id, username, password) => {
    validate.string(id, 'id')
    validate.string(username, 'user name')
    validate.string(password, 'password')

    return (async() => {
        debugger
        const user = await User.findOne({username})
        if(!user) throw new NotAllowedError(`username ${username} is not exist`)

        const pass = await bcrypt.compare(password, user.password)
        if(!pass) throw new NotAllowedError('wrong credentials')
        debugger
        return await User.deleteOne({username})

    })()
}