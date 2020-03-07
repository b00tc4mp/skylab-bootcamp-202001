const { createEvent } = require('../../logic')
const { ContentError } = require('events-errors')


module.exports = (req, res) => {
    const { body: { title, location, date, description }, payload: { sub: id } } = req

    try {
        createEvent(id, title, description, location, new Date(date))
            .then(() => {
                res.status(201).end()
            })
            .catch(({ message }) => {
                res
                    .status(409)
                    .json({ error: message })
            })
    } catch (error) {
        let status = 404

        if (error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({ error: message })
    }
}