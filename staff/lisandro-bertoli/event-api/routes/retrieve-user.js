const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    const { sub } = req
    try {
        retrieveUser(sub)
            .then(user => {
                const { name, surname, email } = user
                res
                    .status(200)
                    .json({ name, surname, email })
            })
            .catch(({ message }) => {
                res
                    .status(401)
                    .json({ error: message })
            })
    } catch ({ message }) {
        res
            .status(401)
            .json({ error: message })
    }
}