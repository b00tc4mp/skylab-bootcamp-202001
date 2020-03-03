const { models: { Event, User } } = require('../data')
const { validate } = require('../utils')

module.exports= (userId, eventId, data) => {
    for(const key in data) {
        if( key === 'data' ) validate.type(data[key], `${key}`, Date)
        else validate.string(data[key], `${key}`)
    }
    validate.type(data, 'data', Object)
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Event.findByIdAndUpdate(eventId, {$set: data})
    .then( () => {} )
    .catch() //??
}