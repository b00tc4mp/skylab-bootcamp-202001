const {validate} = require('karmark-utils')
const {models: {User}} = require('karmark-data')
const {NotFoundError} = require('karmark-errors')

module.exports = (id) =>{
    validate.string(id, 'id')

    return User.findById(id)
        .then(user =>{
            if (!user) throw new NotFoundError (`user with id ${id} not found`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({name, surname, username, programs}) => {

            return {name, surname, username, programs}
        })
}