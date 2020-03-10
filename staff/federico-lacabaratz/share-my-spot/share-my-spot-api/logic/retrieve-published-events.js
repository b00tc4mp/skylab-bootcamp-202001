const { models: { Event } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return Event.find({ publisher: id })
        .then(event => {
            if (!event) throw new NotFoundError(`event with id ${id} does not exist`)
            
            return event
        })
        
}