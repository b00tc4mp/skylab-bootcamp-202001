const { validate } = require('pill-o-clock-utils')
const { models: { User } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (id, check)=> { 
    validate.string(id, 'id')
    validate.type(check, 'check', Boolean)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            
            user.progress.push(check)

            return user.save()
        })
        .then(() => { })
}