const { validate } = require('../utils')
const { models: { User } } = require('../data')


module.exports = (_id, password) => {
    validate.string(_id, 'userId')
    validate.string(password, 'password')

    return User.deleteOne({ _id, password })
        .then(() => { })
}