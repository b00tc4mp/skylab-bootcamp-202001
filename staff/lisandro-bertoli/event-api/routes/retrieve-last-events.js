const { retrieveLastEvents } = require('../logic')


module.exports = (req, res) => {

    try {
        retrieveLastEvents()
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