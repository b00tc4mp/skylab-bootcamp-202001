const { retrievePublishedEvents } = require('../logic')
const { ContentError } = require('../errors')

module.exports = (req, res) => {
    const { payload: { sub } } = req

    try {
        retrievePublishedEvents(sub)
        .then(events => res.status(200).json(events))
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