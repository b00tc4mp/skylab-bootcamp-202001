//updateEvent(id: String - user id, eventId: String - event id, { title?, description?, ... }): Promise // PATCH
const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

// should we limit the update properties? if so, which ones? MANU!?!?!?
module.exports = (userId, eventId, data) => {
    validate.string(userId, 'user ID')
    validate.string(eventId, 'event ID')
    validate.type(data, 'data', Object)
    for(const key in data) {
        if (key === 'date') validate.type(data[key], `${key}`, Date)
        else validate.string(data[key], `${key}`)  
    }

    const events = database.collection('events')
    const  _userId = ObjectId(userId) , _eventId = ObjectId(eventId)

    //FIRST!!!! check if user exists, then if the event exists, and then do this return to update it
    return events.updateOne({ _id: _eventId, publisher: _userId }, { $set: data })
        .then(() => { })

}