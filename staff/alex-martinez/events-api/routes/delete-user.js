const { deleteUser } = require('../logic')


module.exports = (req, res) => {
    const { payload: { sub: userId }, body: { password } } = req
    try {
        deleteUser(userId, password)
            .then(() => {
                res
                    .status(200)
                    .end()
            })
            .catch(({ message }) => {
                res
                    .status(400)
                    .json({ message })
            })
    } catch ({ message }) {

        res
            .status(400)
            .json({ message })
    }
}