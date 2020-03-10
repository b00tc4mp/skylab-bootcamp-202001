const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if(!user.medication.length) throw new NotFoundError (`this user does not have medication yet`)

            return user.medication
        })

}