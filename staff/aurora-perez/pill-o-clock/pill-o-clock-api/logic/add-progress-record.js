const { validate } = require('pill-o-clock-utils')
const { NotFoundError } = require('pill-o-clock-errors')
const { models: { User }} = require('pill-o-clock-data')

module.exports = (userId, records) => {
    validate.string(userId, 'userId')
    validate.type(records, 'records', Object)

    return User.findById(userId)
    .then(user => {
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        return User.findByIdAndUpdate(userId, {$push: { progressRecord: records}})
    })
    .then(() => {})
}