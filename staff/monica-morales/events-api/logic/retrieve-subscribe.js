const {validate} = require('events-utils')
const {models: {Event}} = require('events-data')
const { NotFoundError, NotAllowedError } = require('events-errors')


module.exports = (idUser) =>{

    validate.string(idUser, 'idUser')
        
    return Event.find({subscribers: idUser })
        .then(result =>{
            if(result.length > 0)
                return result
            else throw new NotFoundError('this user has not this subscription')
        })
}