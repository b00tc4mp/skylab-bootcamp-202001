const { models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = (id, eventId, newValues) => {

    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')

    return Event.findOneAndUpdate( { _id: _eventId, publisher: _id }, { $set: newValues } )
        .then(()=> {})

}