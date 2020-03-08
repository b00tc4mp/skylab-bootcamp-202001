const { validate } = require('sick-parks-utils')
const { models: { User } } = require('sick-parks-data')
const { NotAllowedError } = require('sick-parks-errors')
const bcrypt = require('bcryptjs')


module.exports = ({ name, surname, email, password }) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')



    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {

            user = new User({ name, surname, email, password })

            return user.save()
        })
        .then(() => { })

}