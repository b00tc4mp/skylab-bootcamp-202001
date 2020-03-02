const { validate} = require('../utils')
const {database, database:{ObjectId}} = require('../data')
const {NotFoundError} = require('../errors')


module.exports = id => {

    validate.string(id, 'id')

    const _id = ObjectId(id)

    const events = database.collection('events')

    return events.find({ publisher: _id }).toArray()
        .then(result => {

            if (!result) throw new NotFoundError('event not found')
            return result
        })
}