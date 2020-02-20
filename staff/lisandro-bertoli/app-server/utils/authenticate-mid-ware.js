const { authenticateUser, retrieveUser } = require('../logic')


function authMidWare(req, res, next) {
    req.on('end', () => {

        const { username, password } = req.body
        try {
            authenticateUser(username, password)

            res.user = retrieveUser(username)

            res.send(`<h1>${res.user.name}</h1>`)

        } catch (error) {
            if (error) console.log(error)
        }
    })

}

module.exports = authMidWare