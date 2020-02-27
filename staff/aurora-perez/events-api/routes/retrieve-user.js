// TODO jwt.verify(token)
const { authenticateUser } = require('../logic')
const { retrieveUser } = require('../logic')

module.exports = (req, res) => {
    debugger
    const { headers: { authorization } } = req
    let [, token] = authorization.split(' ')
    
    try {
        retrieveUser(token)
        .then(user=> {
            const {name, surname, email} = user
            res
                .status(201)
                .json({name, surname, email})

        })

            
    } catch ({ message }) {
        res
            .status(401) //?
            .json({
                error: message
            })
    }
}