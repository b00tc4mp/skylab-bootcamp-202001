const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')

/**
 * Checks events
 * 
 * @param {id} id user's unique id
 * 
 * @returns {Promise<Object>} events from storage
 * 
 * @throws {NotFoundError} if user id not exist
 * @throws {NotAllowedError} if use is deactivated
 */

module.exports = id => {
    validate.string(id, 'id')
    
    const _id = ObjectId(id)
    
    const users = database.collection('users')
    const events = database.collection('events')

    return users.findOne({ _id }, {publisher: id})
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
        
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)
        
            return events.find({publisher: ObjectId(id)}).toArray()
                .then(event => {
                    return event
                })  
        })
}

