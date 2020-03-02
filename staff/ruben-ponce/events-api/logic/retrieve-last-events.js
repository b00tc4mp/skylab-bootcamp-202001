const { models: { Event } } = require('../data')

/**
 * Checks events
 * 
 * 
 * @returns {Promise<Object>} events from storage
 * 
 */

module.exports = () => {
    
    return Event.find().sort({created: -1})
            .then(event => event)  
}
