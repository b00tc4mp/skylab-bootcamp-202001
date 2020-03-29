const { validate} = require('events-utils')
const {models: {Event}} = require('events-data')
const {NotFoundError} = require('events-errors')


module.exports = id => {

    validate.string(id, 'id')

    return Event.find({ publisher: id })
        .then(result => {

            if (!result) throw new NotFoundError('event not found')
            return result
        })
}