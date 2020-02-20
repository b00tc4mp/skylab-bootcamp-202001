const authenticate = require('../logic/authenticate-user')
const retrieveUser = require('../logic/retrieve-user')


function authMidWare(req, res, next) {
    req.on('end', () => {

        const { username, password } = req.body
        try {
            authenticate(username, password)

            res.user = retrieveUser(username)

            res.send(`<h1>${res.user.name}</h1>`)

        } catch (error) {
            if (error) console.log(error)
        }
    })

}

module.exports = authMidWare