const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = id => {

        validate.string(id, 'id')

        const _id = ObjectId(id)
    
        const events = database.collection('events')
    
        return events.find({ subscribers: _id}).toArray()
            .then(subcribedEvents => subcribedEvents )
    
}
