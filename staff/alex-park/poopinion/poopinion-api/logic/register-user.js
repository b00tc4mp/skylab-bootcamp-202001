const { validate } = require('poopinion-utils')
const { models: { User } } = require('poopinion-data')
const { NotAllowedError } = require('poopinion-errors')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password, age, gender) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.type(age, 'age', Number)
    validate.string(gender, 'gender')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowedError(`user with email ${email} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ name, surname, email, age: Number(age), gender, password, created: new Date })

            return user.save()
        })
        .then(() => { })

}