// TODO jwt.verify(token)
const { authenticateUser } = require('../logic')
const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    debugger
    const { headers: { authorization } } = req
    let [, token] = authorization.split(' ')
    
    try {
        
        const user = retrieveUser(token)
            res.send(user)

            
    } catch ({ message }) {
        res
            .status(401) //?
            .json({
                error: message
            })
    }
}