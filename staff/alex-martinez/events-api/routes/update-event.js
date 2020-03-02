const { updateEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {

    const { body, payload: { sub: userId }, params: {id: eventId} } = req
debugger
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
    } catch ({ message }) {
        res
            .status(404)
            .json({ error: message })
    }
}
