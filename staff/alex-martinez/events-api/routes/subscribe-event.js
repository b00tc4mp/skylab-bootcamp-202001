const { subscribeEvent} = require('../logic')
const {  NotAllowedError, NotFoundError } = require('events-errors')
module.exports = (req, res) => {
    const { body: { id: eventId }, payload: { sub: id } } = req

    try {

        subscribeEvent(id, eventId)
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
            .status(400)
            .json({ error: message })
    }
}
