const { updateEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {
    debugger
    const { body, params: { id: eventId }, payload: { sub: userId } } = req

    try {

        updateEvent(userId, eventId, body)
            .then(() => {
                res.status(201).end()
            })
            .catch((error) => {
                let status = 400

                switch (true) {
                    case error instanceof NotFoundError:
                        status = 404
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

        res
            .status(status)
            .json({ error: message })
    }
}