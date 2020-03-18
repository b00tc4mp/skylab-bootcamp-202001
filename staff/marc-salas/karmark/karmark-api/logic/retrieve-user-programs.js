const {validate} = require('karmark-utils')
const {models: {User}} = require('karmark-data')
const {NotFoundError} = require('karmark-errors')

module.exports = (id)  => {
    validate.string(id, 'id')

    return User.findById(id).populate('programs')
        .then(user =>{

            if (!user) throw new NotFoundError(`user not found`)
           
            user.id = user._id.toString()

            delete user._id

            user.programs.forEach(program => {
                program = program.toString()
            })

            return user.programs
        })

}