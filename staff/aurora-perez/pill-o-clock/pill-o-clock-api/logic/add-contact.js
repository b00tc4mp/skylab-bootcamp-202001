const { validate } = require('pill-o-clock-utils')
const { models: { User } } = require('pill-o-clock-data')
const { NotFoundError, NotAllowedError } = require('pill-o-clock-errors')

module.exports = (idUser, idSecondUser)=> { 
    validate.string(idUser, 'idUser')
    validate.string(idSecondUser, 'idSecondUser')    

    return Promise.all([User.findById(idUser), User.findById(idSecondUser)])
        .then(([user, secondUser]) => {
            if (!user) throw new NotFoundError(`user with id ${idUser} not found`)

            if (!secondUser) throw new NotFoundError(`user with id ${secondUser} not found`)
            
            user.contacts.push(idSecondUser)

            secondUser.contacts.push(idUser)

            return Promise.all([user.save(), secondUser.save()])
        })
        .then(() => { })
}