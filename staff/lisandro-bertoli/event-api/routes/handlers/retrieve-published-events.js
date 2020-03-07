const { retrievePublishedEvents } = require('../../logic')


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

        switch (true) {
            case error instanceof ContentError:
                status = 401
                break
            case error instanceof TypeError:
                status = 406 //not acceptable
        }

        const { message } = error
        res
            .status(status)
            .json({ error: message })
    }
}