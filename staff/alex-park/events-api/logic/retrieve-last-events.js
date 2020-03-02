const { models: { Event } } = require('../data')

module.exports = () => {
    const now = new Date
    return Event.find({ date: { $gt: now } }).sort({ date: 1 })
}