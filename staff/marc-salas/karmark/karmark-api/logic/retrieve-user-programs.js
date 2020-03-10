const {validate} = require('karmark-utils')
const {models: {User}} = require('karmark-data')
const {NotFoundError} = require('karmark-errors')

module.exports = (id)  => {
    validate.string(id, 'id')

    return User.findById(id).populate('programs')
        .then(user =>{
            debugger
            if (!user) throw new NotFoundError (`user dont exist`)

            return user.programs
        })

}