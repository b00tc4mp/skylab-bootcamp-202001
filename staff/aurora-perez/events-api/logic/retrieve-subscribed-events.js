//retrieveSubscribedEvents(id: String - user id): Promise<[]> // GET

const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = ( userId ) => {
    validate.string(userId, 'userId')

    const events = database.collection('events')

    return events.find({ subscribers: ObjectId(userId) }).toArray()
    
}