const { retrievePublishedEvents } = require('../logic')
const { NotFoundError, NotAllowedError } = require('events-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedEvents(id)
            .then(events =>
                res.status(200).json(events)
            )
            .catch(({ message }) =>
                res.status(404).json({error: message})
            )
    } catch (error) {
        let status = 400

        if(error instanceof NotFoundError)
            status = 404 // not found

        const { message } = error

        res.status(status).json({error: message})
    }
}