const { retrievePublishedlistings } = require('../logic')
const {  NotFoundError } = require('listings-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrievePublishedlistings(id)
            .then(listing =>
                res.status(200).json(listing)
            )
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        switch (true) {
            case error instanceof NotFoundError:
                status = 404 // not found
                break
        }

        const {message} = error

        res
            .status(status)
            .json({ 
                error: message
            })
    }
}