const { subscribeEvent } = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {
    debugger
    const { body: {eventId}, payload: { sub: userId} } = req
    
    try {
        subscribeEvent(userId, eventId)
            .then(() => res.status(200).end())
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        // switch (true) {
        //     case error instanceof NotFoundError:
        //         status = 404 // not found
        //         break
        //     case error instanceof NotAllowedError:
        //         status = 403 // forbidden
        // }

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}