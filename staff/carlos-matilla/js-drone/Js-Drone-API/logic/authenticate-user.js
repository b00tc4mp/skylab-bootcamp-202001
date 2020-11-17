const { validate } = require('./../../Js-Drone-UTILS')
const { models: { User } } = require('./../../Js-Drone-DATA')
const { NotAllowedError } = require('./../../Js-Drone-ERRORS')
const bcrypt = require('bcryptjs')


module.exports = (username, password) => {
    validate.string(username, 'username')
    validate.string(password, 'password')

    return User.findOne({ username })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError(`wrong credentials`)
                    
                    return user.save()
                })
                .then(({ id }) => id)
        })
}