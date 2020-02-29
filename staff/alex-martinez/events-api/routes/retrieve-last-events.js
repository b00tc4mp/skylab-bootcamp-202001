const { retrieveLastEvents} = require('../logic')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {

    try {
        retrieveLastEvents()
            .then(events =>
                res.status(200).json(events)
            )
            .catch(({ message }) =>
                res
                    .status(404)
                    .json({
                        error: message
                    })
            )
    } catch (error) {
        let status = 400

        if(error instanceof NotFoundError)
            status = 404 // not found

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}