
const { models: { Event } } = require('../data')

module.exports = () => {

    return Event.find().sort({date: -1})
        .then((events) => events)
    
}