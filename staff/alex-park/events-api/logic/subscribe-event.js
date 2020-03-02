const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
const { SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = (id, _id) => {
    debugger
    validate.string(id, 'user ID')
    // validate.type(_id, 'event ID', String)

    return User.findByIdAndUpdate(id , { $addToSet: {subscribedEvents: _id }})
        .then(() => Event.findByIdAndUpdate(_id, { $addToSet: { subscribers: id }}))
        .then(() => { })
}