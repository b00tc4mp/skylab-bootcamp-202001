const { validate } = require('../utils')
const { models: { Event } } = require('../data')

module.exports = id => {

        validate.string(id, 'id')

        const _id = ObjectId(id)
    
        return Event.find({ subscribers: _id})
            .then(subcribedEvents => subcribedEvents )
    
}
