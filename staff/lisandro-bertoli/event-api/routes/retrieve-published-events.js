const { retrievePublishedEvents } = require('../logic')


module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedEvents(id)
            .then(events => {
                res
                    .status(200)
                    .json(events)
            })
            .catch(({ message }) => {
                res
                    .status(401)
                    .json({ error: message })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError) status = 422

        const { message } = error
        res
            .status(status)
            .json({ error: message })
    }
}