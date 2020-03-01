const { database } = require('../data')

/**
 * Checks events
 * 
 * 
 * @returns {Promise<Object>} events from storage
 * 
 */

module.exports = () => {
    
    const events = database.collection('events')
    const cursor = events.find().sort({created: -1})
    
        return cursor.toArray()
            .then(event => {
                return event
            })  
}
