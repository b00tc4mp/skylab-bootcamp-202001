const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
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
    debugger
    validate.string(id, 'id')
    const _id = id

    // return User.findOne({ _id }, {publisher: id})
    //     .then(user => {
    //         if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
        
    //         if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)
        debugger
            return Event.find({subscribers: id})
                .then(event => event)
        // })
}

