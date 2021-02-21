const { deleteEvent } = require('../logic')
const { ContentError, NotAllowedError } = require('events-errors')

module.exports = (req, res) => {
    const { params: { id: eventId }, payload: { sub: userId } } = req
    try {
        deleteEvent(userId, eventId)
            .then(() => {
                res
                    .status(200)
                    .end()
            })
            .catch(error => {
                let status = 404

                if (error instanceof NotAllowedError)
                    status = 403

                const { message } = error

                res
                    .status(status)
                    .json({ message })
            })
    } catch (error) {
        let status = 404

        if (error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error
        res
            .status(status)
            .json({ message })
    }
}