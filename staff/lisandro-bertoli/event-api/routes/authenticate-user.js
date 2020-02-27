const { authenticateUser } = require('../logic')
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET, JWT_EXP: expiration } } = process

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
            .catch(({ message }) => {
                res
                    .status(401)
                    .json({
                        error: message
                    })
            })
    } catch ({ message }) {
        res
            .status(400)
            .json({
                error: message
            })
    }
}