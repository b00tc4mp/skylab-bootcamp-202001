const { subscribeEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

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
    } catch (error) {
        let status = 400

        if (error instanceof TypeError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({ error: message })
    }
}