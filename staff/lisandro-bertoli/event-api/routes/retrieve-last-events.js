const { retrieveLastEvents } = require('../logic')


module.exports = (req, res) => {
    let { params: { page = '1' } } = req

    try {
        retrieveLastEvents(page)
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

        if (error instanceof TypeError) status = 406 //Not Acceptable

        const { message } = error
        res
            .status(status)
            .json({ error: message })
    }
}