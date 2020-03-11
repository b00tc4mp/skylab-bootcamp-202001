const { validate } = require('pill-o-clock-utils')
const { models: { User } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (idUser, idUserToAdd)=> { 
    validate.string(idUser, 'idUser')
    validate.string(idUserToAdd, 'idUserToAdd')    

    return User.findById(idUser)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${idUser} not found`)
            
            user.contacts.push(idUserToAdd)

            return user.save()
        })
        .then(() => { })
}