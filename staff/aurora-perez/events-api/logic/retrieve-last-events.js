//(id: String - user id): Promise<[]> // GET

const { models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = () => {

    const now = new Date 

    return Event.find({date: { $gt: now}}).sort( { date: 1 } )
    
}