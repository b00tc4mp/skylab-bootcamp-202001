const {validate} = require('../utils')
const {database} = require('../data')
const {NotFoundError} = require('../errors')

module.exports = () => {
    // validate.type(date, "date", Date)

    const events = database.collection('events')

    return events.find().sort({date: -1}).toArray()
    .then(events=> {
        if(!events) throw new NotFoundError('Events not found')
        return events
})

}