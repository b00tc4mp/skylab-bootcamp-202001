const { retrieveUser } = require('../logic')
const { NotAllowedError, NotFoundError, ContentError } = require('events-errors')

module.exports = (req, res) => {
    const { payload: { sub: id } } = req

    try {
        retrieveUser(id)
            .then(user => {
                res
                    .status(200)
                    .json(user)
            })
            .catch(error => {
                let status = 400
                switch (true) {
                    case error instanceof NotFoundError:
                        status = 404
                        break
                    case error instanceof NotAllowedError:
                        status = 403
                        break
                }

                const { message } = error

                res
                    .status(status)
                    .json({ error: message })
            })
    } catch (error) {
        let status = 400

        if (error instanceof ContentError)
            status = 401

        const { message } = error
        res
            .status(status)
            .json({ error: message })
    }
}