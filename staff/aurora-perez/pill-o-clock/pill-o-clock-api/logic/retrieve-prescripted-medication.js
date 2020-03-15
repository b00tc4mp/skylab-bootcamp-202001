const { validate } = require('pill-o-clock-utils')
const { models: { User, Drug, Guideline } } = require('pill-o-clock-data')
const { NotFoundError } = require('pill-o-clock-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            return Guideline.find({prescribed: id}).populate('drug')
        })

}