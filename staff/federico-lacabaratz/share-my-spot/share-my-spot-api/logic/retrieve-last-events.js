const { models: { Event } } = require('share-my-spot-data')

module.exports = () => {


    return Event.find().sort({ created: -1 })
        .then(events => {
            return events
        })
}