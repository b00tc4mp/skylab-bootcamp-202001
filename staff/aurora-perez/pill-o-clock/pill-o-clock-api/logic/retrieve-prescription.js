const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, GuideLine } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id).lean()
        .then(user => {
            
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if(!user.prescription.length) throw new NotFoundError (`this user does not have medication yet`)

            return user.prescription
        })

}