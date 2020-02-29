const { createEvent } = require('../logic')

module.exports = (req, res) => {
    const { body: { title, location, date, description }, params: { id } } = req

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
    } catch ({ message }) {
        res
            .status(400)
            .json({ error: message })
    }
}