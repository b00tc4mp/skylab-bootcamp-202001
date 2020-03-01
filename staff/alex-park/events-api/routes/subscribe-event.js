const { subscribeEvent } = require('../logic')
const { ContentError } = require('../errors')

module.exports = (req, res) => {
    const { body: { eventId }, payload: { sub: userId } } = req

    try {
        subscribeEvent(userId, eventId)
        .then(() => res.status(200).end())
        .catch(error => {
            let status = 400

            const { message } = error

            res
                .status(status)
                .json({
                    error: message
                })
        })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}