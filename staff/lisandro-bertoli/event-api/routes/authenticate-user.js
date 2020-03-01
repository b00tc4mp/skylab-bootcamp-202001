const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET, JWT_EXP: expiration } } = process
const { ContentError, NotAllowedError } = require('../errors')

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(id => {

                const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: expiration })
                res
                    .status(200)
                    .json({
                        token
                    })
            })
            .catch(error => {
                let status = 404

                if (error instanceof NotAllowedError)
                    status = 401

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error
        res
            .status(status)
            .json({
                error: message
            })
    }
}