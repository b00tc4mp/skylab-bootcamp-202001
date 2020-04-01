const { retrieveSubscribedEvents } = require('../logic')
const { NotFoundError, NotAllowedError } = require('events-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req
    
    try {
        retrieveSubscribedEvents(id)
            .then(events =>
                res.status(200).json(events)
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}