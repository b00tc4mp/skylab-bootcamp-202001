const { models: { Event } } = require('../data')
const { validate } = require('../utils')


module.exports = (page) => {
    validate.string(page, 'page')

    const limit = 5

    return Event.find()
        .sort({ created: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec()

}