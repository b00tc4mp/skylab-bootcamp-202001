const { updateEvent } = require('../../logic')
const { ContentError, NotAllowedError } = require('events-errors')

module.exports = (req, res) => {
    const { body, params: { id: eventId }, payload: { sub: userId } } = req

    try {

        updateEvent(userId, eventId, body)
            .then(() => {
                res.status(201).end()
            })
            .catch(error => {
                let status = 400

                switch (true) {
                    case error instanceof ContentError:
                        status = 406
                        break
                    case error instanceof NotAllowedError:
                        status = 403
                        break
                }

                const { message } = error
                res
                    .status(status)
                    .json({ error: message })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError)
            status = 416

        const { message } = error

        res
            .status(status)
            .json({ error: message })
    }
}