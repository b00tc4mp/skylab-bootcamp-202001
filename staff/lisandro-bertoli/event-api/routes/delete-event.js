const { deleteEvent } = require('../logic')

module.exports = (req, res) => {
    debugger
    const { params: { eid: eventId, id: userId } } = req

    try {
        deleteEvent(userId, eventId)
            .then(() => {
                res
                    .status(200)
                    .end()
            })
            .catch(error => {

                const { message } = error
                res
                    .status(404)
                    .json({ message })
            })
    } catch (error) {
        const { message } = error
        res
            .status(404)
            .json({ message })
    }
}