// TODO
// TODO jwt.verify(token)
const { authenticateUser } = require('../logic')
const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        debugger
        authenticateUser(email, password)
            .then(token => {
                res.status(200).json({ token })
                retrieveUser(token)
                .then(console.log(user))
                
            })
            .catch(({ message }) =>
                res
                    .status(401)
                    .json({
                        error: message
                    })
            )
            
    } catch ({ message }) {
        res
            .status(401) //?
            .json({
                error: message
            })
    }
}