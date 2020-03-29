const { models: {Event} } = require('events-data')
const { NotFoundError } = require('events-errors')
module.exports = () => {
    // const events = database.collection('events')
    const now = new Date
    return Event.find({ date : {$gt: now }})
        .then(event => {
            if (!event.length) throw new NotFoundError(`There are no events coming soon`)
            return event
        })
}